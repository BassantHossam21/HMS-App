import React from "react";
import { Backdrop, Typography } from "@mui/material";

export default function LoadingSpinner({ loading }) {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "rgba(31, 38, 62, 0.4)", // Transparent #1F263E
        backdropFilter: "none", // Removed blur
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
      open={loading}
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        style={{ background: "transparent", display: "block" }}
      >
        <g transform="translate(50,50)">
          {[...Array(16)].map((_, i) => (
            <g key={i} transform={`rotate(${i * 22.5})`}>
              <line
                x1="0"
                y1="-22"
                x2="0"
                y2="-42"
                stroke="#203FC7"
                strokeWidth="6"
                strokeLinecap="round"
              >
                <animate
                  attributeName="opacity"
                  values="1;0"
                  keyTimes="0;1"
                  dur="1s"
                  begin={`-${(15 - i) / 16}s`}
                  repeatCount="indefinite"
                />
              </line>
            </g>
          ))}
        </g>
      </svg>
      <Typography
        sx={{
          color: "#203FC7", // Matching spinner color
          fontSize: "26px", // Slightly bigger text
          fontFamily: "serif",
          letterSpacing: "2px",
          fontWeight: "bold",
        }}
      >
        loading...
      </Typography>
    </Backdrop>
  );
}
