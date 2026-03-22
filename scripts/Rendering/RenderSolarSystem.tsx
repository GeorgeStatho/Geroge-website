import React from "react";
import { Planet } from "../Planets/Planets";
import { SolarSystem } from "../Planets/SolarSystem";
import RenderPlanet from "./RenderPlanets";
import "../../css/SolarSystem.css";

const ringSizes = [380, 600, 840, 1000, 1100];

async function createSolarSystem(name:string){
    const system = new SolarSystem(name);
    await system.createSolarSystem();
    return system;
}

export function RenderRings() {
    const tilt = 0.48;

    return (
        <div className="solar-system-rings" aria-hidden="true">
            {ringSizes.map((size, index) => (
                <div
                    key={size}
                    className="solar-system-ring"
                    style={{
                        width: `${size}px`,
                        height: `${size * tilt}px`,
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

function getPlanetSlotStyle(ringIndex: number, slotIndex: number, slotCount: number) {
    const ringRadius = ringSizes[Math.min(ringIndex, ringSizes.length - 1)] / 2;

    const baseAngle = (slotIndex / Math.max(slotCount, 1)) * Math.PI * 2;

    const seed =
        Math.sin((ringIndex + 1) * 97 + (slotIndex + 1) * 131 + slotCount * 53) * 10000;
    const normalizedSeed = seed - Math.floor(seed);

    const jitter = (normalizedSeed - 0.5) * 0.45; // slight angle offset
    const angle = baseAngle + jitter;

    const tilt = 0.48;
    const x = Math.cos(angle) * ringRadius;
    const y = Math.sin(angle) * ringRadius * tilt;

    const depth = Math.sin(angle);
    const normalizedDepth = (depth + 1) / 2;

    const scale = 0.88 + normalizedDepth * 0.18;
    const opacity = 0.62 + normalizedDepth * 0.38;
    const zIndex = Math.round(20 + normalizedDepth * 100);

    return {
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        zIndex,
    };
}

function hashString(value:string){
    let hash = 0;

    for (let index = 0; index < value.length; index += 1) {
        hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
    }

    return hash;
}

function getDeadPlanetSlotStyle(planet:Planet, index:number){
    const seed = hashString(`${planet.name}-${index}`);
    const angle = ((seed % 1000) / 1000) * Math.PI * 2;
    const xRadiusPercent = Math.min(38 + index * 2.5, 46);
    const yRadiusPercent = Math.min(24 + index * 1.8, 30);
    const x = Math.cos(angle) * xRadiusPercent;
    const y = Math.sin(angle) * yRadiusPercent;
    const depth = Math.sin(angle);
    const normalizedDepth = (depth + 1) / 2;
    const scale = 0.72 + normalizedDepth * 0.12;
    const opacity = 0.28 + normalizedDepth * 0.28;
    const zIndex = Math.round(4 + normalizedDepth * 18);

    return {
        left: `calc(50% + ${x}%)`,
        top: `calc(50% + ${y}%)`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        zIndex,
    };
}

function RenderSolarSystem({ system }:{ system: SolarSystem }){
    const userPlanet = system.planets.find((planet) => planet.isUserPlanet);
    const repoPlanets = system.planets
        .filter((planet) => !planet.isUserPlanet)
        .sort((left, right) => right.importance - left.importance);
    const visibleRepoPlanets = repoPlanets.slice(0, 5);
    const deadRepoPlanets = repoPlanets.slice(5);
    const planetsByRing = visibleRepoPlanets.reduce<Record<number, Planet[]>>((groups, planet) => {
        const ringIndex = getRecencyRingIndex(planet);
        const group = groups[ringIndex] ?? [];
        group.push(planet);
        groups[ringIndex] = group;
        return groups;
    }, {});

    return (
        <section className="solar-system-stage">
        <div className="solar-system-scene solar-system-container">
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
            {deadRepoPlanets.map((planet, index) => (
                <div
                    key={`${planet.name}-dead-${index}`}
                    className="solar-system-planet-slot solar-system-orbiting-planet-slot solar-system-dead-planet-slot"
                    style={getDeadPlanetSlotStyle(planet, index)}
                >
                    <RenderPlanet planet={planet} forcedBiome="dead" />
                </div>
            ))}
        </div>
        </section>
    );
}

export { createSolarSystem };
export default RenderSolarSystem;
