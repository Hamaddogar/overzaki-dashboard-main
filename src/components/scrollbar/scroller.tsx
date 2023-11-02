/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Box } from '@mui/material';
import React, { useRef } from 'react';
import { PersonalProps } from './types';
import './style.css';

export function ScrollbarX({ children }: PersonalProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    let pos = { left: 0, x: 0 };

    const startTouchHandler = (e: React.TouchEvent) => {
        if (!containerRef.current) return;

        pos = {
            left: containerRef.current.scrollLeft,
            x: e.touches[0].clientX,
        };

        containerRef.current.addEventListener('touchmove', touchMoveHandler);
        containerRef.current.addEventListener('touchend', touchEndHandler);
    };

    const touchMoveHandler = (e: TouchEvent) => {
        if (!containerRef.current) return;

        const dx = e.touches[0].clientX - pos.x;

        if (containerRef.current) {
            containerRef.current.scrollLeft = pos.left - dx;
        }
    };

    const touchEndHandler = () => {
        containerRef.current?.removeEventListener('touchmove', touchMoveHandler);
        containerRef.current?.removeEventListener('touchend', touchEndHandler);
    };

    const mouseDownHandler = (e: React.MouseEvent) => {
        if (!containerRef.current) return;

        pos = {
            left: containerRef.current.scrollLeft,
            x: e.clientX,
        };

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = (e: MouseEvent) => {
        if (!containerRef.current) return;

        const dx = e.clientX - pos.x;

        if (containerRef.current) {
            containerRef.current.scrollLeft = pos.left - dx;
        }
    };

    const mouseUpHandler = () => {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    return (
        <Box
            ref={containerRef}
            onTouchStart={startTouchHandler}
            onMouseDown={mouseDownHandler}
            className='cursor-config'
            sx={{
                width: '100%',
                transition: 'all .6s',
                overflowX: 'auto',
                WebkitOverflowScrolling: 'touch',
                '&::-webkit-scrollbar': {
                    display: 'none'
                }
            }}
        >
            <div className="active-selectable">{children}</div>
        </Box>
    );
}

export function ScrollbarY({ children }: PersonalProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    let pos = { top: 0, y: 0 };

    const mouseDownHandler = (e: React.MouseEvent) => {
        if (!containerRef.current) return;

        pos = {
            top: containerRef.current.scrollTop,
            y: e.clientY,
        };

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = (e: MouseEvent) => {
        if (!containerRef.current) return;

        const dy = e.clientY - pos.y;

        if (containerRef.current) {
            containerRef.current.scrollTop = pos.top - dy;
        }
    };

    const mouseUpHandler = () => {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    return (
        <Box
            ref={containerRef}
            sx={{
                height: '100%',
                transition: 'all .6s',
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                    display: 'none'
                }
            }}
            onMouseDown={mouseDownHandler}
            className='cursor-config'
        >
            <div className="non-selectable">{children}</div>
        </Box>
    );
}
