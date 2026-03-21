import React from "react";
import { Planet } from "../Planets/Planets";
import { SolarSystem } from "../Planets/SolarSystem";
import RenderPlanet from "./RenderPlanets";
import "./RenderSolarSystem.css";

const ringSizes = [280, 400, 540, 700, 880];

async function createSolarSystem(name:string){
    const system = new SolarSystem(name);
    await system.createSolarSystem();
    return system;
}

export function RenderRings(){
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

function getRecencyRingIndex(planet:Planet){
    const updatedAt = new Date(planet.date).getTime();
    const now = Date.now();
    const ageInDays = (now - updatedAt) / (1000 * 60 * 60 * 24);

    if (!Number.isFinite(updatedAt)) {
        return ringSizes.length - 1;
    }

    if (ageInDays <= 7) {
        return 0;
    }

    if (ageInDays <= 30) {
        return 1;
    }

    if (ageInDays <= 90) {
        return 2;
    }

    if (ageInDays <= 365) {
        return 3;
    }

    return 4;
}

function getPlanetSlotStyle(ringIndex:number,slotIndex:number,slotCount:number){
    const ringRadius = ringSizes[Math.min(ringIndex, ringSizes.length - 1)] / 2;
    const seed = Math.sin((ringIndex + 1) * 97 + (slotIndex + 1) * 131 + slotCount * 53) * 10000;
    const normalizedSeed = seed - Math.floor(seed);
    const angle = normalizedSeed * Math.PI * 2;
    const x = Math.cos(angle) * ringRadius;
    const y = Math.sin(angle) * ringRadius;

    return {
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
    };
}

function RenderSolarSystem({ system }:{ system: SolarSystem }){
    const userPlanet = system.planets.find((planet) => planet.isUserPlanet);
    const visibleRepoPlanets = system.planets
        .filter((planet) => !planet.isUserPlanet)
        .sort((left, right) => right.importance - left.importance)
        .slice(0, 5);
    const planetsByRing = visibleRepoPlanets.reduce<Record<number, Planet[]>>((groups, planet) => {
        const ringIndex = getRecencyRingIndex(planet);
        const group = groups[ringIndex] ?? [];
        group.push(planet);
        groups[ringIndex] = group;
        return groups;
    }, {});

    return (
        <div className="solar-system-scene">
            <RenderRings />
            {userPlanet ? (
                <div
                    className="solar-system-planet-slot solar-system-sun-slot"
                    key={`${userPlanet.name}-sun`}
                >
                    <RenderPlanet planet={userPlanet} />
                </div>
            ) : null}
            {Object.entries(planetsByRing).flatMap(([ringKey, planets]) =>
                planets.map((planet, index) => (
                    <div
                        key={`${planet.name}-${ringKey}-${index}`}
                        className="solar-system-planet-slot solar-system-orbiting-planet-slot"
                        style={getPlanetSlotStyle(Number(ringKey), index, planets.length)}
                    >
                        <RenderPlanet planet={planet} />
                    </div>
                ))
            )}
        </div>
    );
}

export { createSolarSystem };
export default RenderSolarSystem;
