import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export const Roulette = () => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [stoppedColor, setStoppedColor] = useState(null);
    const rouletteRef = useRef(null);
    document.body.style.overflow = "hidden";
    
    const handleSpinClick = () => {
        if (!isSpinning) {
            setIsSpinning(true);
            setStoppedColor(null);
            rouletteRef.current.style.animation = "spin 5s infinite linear";
            setTimeout(() => {
                stopSpinning();
            }, 5000);
        }
    };

    const stopSpinning = () => {
        setIsSpinning(false);
        const colors = ["$roulette-color-1", "$roulette-color-2", "$roulette-color-3"];
        const randomIndex = Math.floor(Math.random() * 3);
        const targetAngle = 120 * randomIndex;
        const currentAngle = 360 - (rouletteRef.current.getBoundingClientRect().top % 360);
        const rotation = currentAngle % 360;
        const remainingRotation = (360 - rotation + targetAngle) % 360;
        rouletteRef.current.style.animation = "none";
        rouletteRef.current.style.transform = `rotate(${rotation}deg)`;
        setTimeout(() => {
            rouletteRef.current.style.transition = "transform 2s ease-out";
            rouletteRef.current.style.transform = `rotate(${rotation + remainingRotation}deg)`;
            setStoppedColor(colors[randomIndex]);
            if (randomIndex === 0) {
                setTimeout(() => {
                    window.location.href = "/questions/teatro-cordoba";
                }, 2000);
            } else if (randomIndex === 1) {
                setTimeout(() => {
                    window.location.href = "/questions/teatro-independiente-cordoba";
                }, 2000);
            }

            else if (randomIndex === 2) {
                setTimeout(() => {
                    window.location.href = "/questions/teatro-cirulaxia";
                }, 2000);
            }
        }, 100);
    };


    return (
        <div className="main_card">
            <h2 className="roulette_title">TRIVIA TEATRO</h2>

            <div className={`roulette-container ${isSpinning ? "roulette_spinning" : ""}`} ref={rouletteRef}>
                <ul className="roulette">
                    <li>
                        <div className="content first">
                            <p>Teatro oficial</p>
                        </div>
                        <div className="background"></div>
                    </li>

                    <li>
                        <div className="content second">
                            <p>Cirulaxia</p>
                        </div>
                        <div className="background"></div>
                    </li>

                    <li>
                        <div className="content third">
                            <p>Teatro Independiente</p>
                        </div>
                        <div className="background"></div>
                    </li>
                </ul>
            </div>

            <button className="roulette_button" onClick={handleSpinClick}>Girar</button>
            <FontAwesomeIcon className="roulette_arrow" icon={faArrowRight} />


        </div>
    );
};
