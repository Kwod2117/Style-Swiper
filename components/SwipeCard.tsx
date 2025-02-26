"use client";               // Run on client side instead of server
import { motion } from "framer-motion";         // Allows smooth swiping/dragging
import React, { useState } from "react";

type SwipeCardProps = {
    onSwipe: (direction: "left" | "right") => void;     // Function prop which takes string direction, updates state when swipe occurs
};

export default function SwipeCard({onSwipe} : SwipeCardProps) {
    const [position, setPosition] = useState(0);        // Tracks card position

    const handleDragBounds = (_event: any, info: any) => {
        const swipeThreshold = 150;                     // Needs swipe distance >= 150 to be considered valid swipe

        if (info.offset.x > swipeThreshold) {           // Detected swipe in pos direction
            setPosition(1);                             // Card is leaving page
            onSwipe("right");
        } else if (info.offset.x < -swipeThreshold) {   // Detected swipe in neg direction
            setPosition(1);                             // Card is leaving page
            onSwipe("left");
        }
    };

    return (
        // Allows for animation features
        <motion.div                                 
            drag="x"      // Enable horizontal movement
            dragConstraints={{ left: -300, right: 300 }}          // Horizontal movement boundaries; -100px left & 400px right
            whileTap={{ cursor: "grabbing" }}                     // Changes cursor to grab when you drag/tap
            whileHover={{ scale: 1.05 }}                          // Enlarges the card when you hover over it
            // animate={{ x: position, transition: { type: "spring", stiffness: 500, damping: 1000 } }}        // Trying to stop it from sliding after letting go
            animate={position ? {x: "150%", opacity: 0} : {x : 0}} transition={{type: "spring", stiffness: 300, damping: 30}}
            onDragEnd={handleDragBounds}                          // Drag boundary issues handled w/ handleDragBounds() method
            style={{
                width: "300px",
                height: "400px",
                backgroundColor: "black", 
                borderRadius: "15px",                               // Rounds the corners
                display: "flex",                                    // Layout that helps you adjust horizontal and vertical positions
                alignItems: "center",                               // Vertical alignment
                justifyContent: "center",                           // Horizontal alignment
                fontSize: "20px",                                   // Font size
                fontWeight: "bold",                                 // Font Weight
                color: "white",                                     // Font Color
                cursor: "grab",                                     // Changes cursor to grab when you hover
            }}
            >
                {/*Content inside card*/} 
                Pretend we have clothes here             
        </motion.div>
  );
}
