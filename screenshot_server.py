#!/usr/bin/env python3
"""
Screenshot MCP Server

A Model Context Protocol server that provides screenshot capture capabilities.
This server allows Claude to take screenshots and save them to specified locations.
"""

import sys
import json
import base64
import mimetypes
from typing import Any, Dict, List, Optional
import asyncio
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

try:
    import mcp
    from mcp.server import Server
    from mcp.types import Tool, TextContent
    import mcp.server.stdio
except ImportError:
    logger.error("MCP library not found. Install with: pip install mcp")
    sys.exit(1)

try:
    import PIL.ImageGrab as ImageGrab
    from PIL import Image
except ImportError:
    logger.error("PIL/Pillow not found. Install with: pip install pillow")
    sys.exit(1)

import os
from pathlib import Path

app = Server("screenshot-server")

@app.list_tools()
async def list_tools() -> List[Tool]:
    """List available screenshot tools."""
    return [
        Tool(
            name="take_screenshot",
            description="Take a screenshot and save it to a specified path",
            inputSchema={
                "type": "object",
                "properties": {
                    "file_path": {
                        "type": "string",
                        "description": "Full path where to save the screenshot (e.g., '/path/to/screenshot.png')"
                    },
                    "region": {
                        "type": "object",
                        "description": "Optional region to capture (x, y, width, height)",
                        "properties": {
                            "x": {"type": "integer"},
                            "y": {"type": "integer"}, 
                            "width": {"type": "integer"},
                            "height": {"type": "integer"}
                        },
                        "required": ["x", "y", "width", "height"]
                    }
                },
                "required": ["file_path"]
            }
        ),
        Tool(
            name="save_image_from_clipboard",
            description="Save an image from clipboard to specified path",
            inputSchema={
                "type": "object",
                "properties": {
                    "file_path": {
                        "type": "string",
                        "description": "Full path where to save the image from clipboard"
                    }
                },
                "required": ["file_path"]
            }
        )
    ]

@app.call_tool()
async def call_tool(name: str, arguments: Dict[str, Any]) -> List[TextContent]:
    """Handle tool calls."""
    
    if name == "take_screenshot":
        try:
            file_path = arguments["file_path"]
            region = arguments.get("region")
            
            # Ensure directory exists
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            
            # Take screenshot
            if region:
                bbox = (region["x"], region["y"], 
                       region["x"] + region["width"], 
                       region["y"] + region["height"])
                screenshot = ImageGrab.grab(bbox=bbox)
            else:
                screenshot = ImageGrab.grab()
            
            # Save screenshot
            screenshot.save(file_path)
            
            return [TextContent(
                type="text",
                text=f"Screenshot saved successfully to: {file_path}"
            )]
            
        except Exception as e:
            logger.error(f"Error taking screenshot: {e}")
            return [TextContent(
                type="text",
                text=f"Error taking screenshot: {str(e)}"
            )]
    
    elif name == "save_image_from_clipboard":
        try:
            file_path = arguments["file_path"]
            
            # Ensure directory exists
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            
            # Try to get image from clipboard
            try:
                clipboard_image = ImageGrab.grabclipboard()
                if clipboard_image is None:
                    return [TextContent(
                        type="text",
                        text="No image found in clipboard"
                    )]
                
                # Save the image
                clipboard_image.save(file_path)
                
                return [TextContent(
                    type="text",
                    text=f"Image from clipboard saved successfully to: {file_path}"
                )]
                
            except Exception as e:
                return [TextContent(
                    type="text",
                    text=f"Error accessing clipboard: {str(e)}"
                )]
                
        except Exception as e:
            logger.error(f"Error saving clipboard image: {e}")
            return [TextContent(
                type="text",
                text=f"Error saving clipboard image: {str(e)}"
            )]
    
    else:
        return [TextContent(
            type="text",
            text=f"Unknown tool: {name}"
        )]

async def main():
    """Main server loop."""
    async with mcp.server.stdio.stdio_server() as (read_stream, write_stream):
        await app.run(
            read_stream,
            write_stream,
            app.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())