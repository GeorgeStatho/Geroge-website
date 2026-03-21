import React from "react";
import { SolarSystem } from "../Planets/SolarSystem";
import RenderPlanet from "./RenderPlanets";
import "./RenderSolarSystem.css";

function createSolarSystem(name:string){
    const system = new SolarSystem(name);
    system.createSolarSystem();
    return system;
}

export function RenderRings(){
    const ringSizes = [280, 400, 540, 700, 880];

    return (
        <div className="solar-system-rings" aria-hidden="true">
            {ringSizes.map((size, index) => (
                <div
                    key={size}
                    className="solar-system-ring"
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        opacity: `${0.34 - index * 0.04}`,
                    }}
                />
            ))}
        </div>
    );
}

function RenderSolarSystem({ system }:{ system: SolarSystem }){
    return (
        <div className="solar-system-scene">
            <RenderRings />
            {system.planets.map((planet, index) => (
                <div
                    key={`${planet.name}-${index}`}
                    className="solar-system-planet-slot"
                >
                    <RenderPlanet planet={planet} />
                </div>
            ))}
        </div>
    );
}

export { createSolarSystem };
export default RenderSolarSystem;
