import React from "react";
import { Planet } from "../Planets/Planets";
import "../../css/Planet.css";

type RenderPlanetProps = {
    planet: Planet;
};

type PlanetLayerProps = {
    planet: Planet;
    planetSize: number;
    glowSize: number;
    ringSize: number;
    moonCount: number;
};

function clamp(value:number,min:number,max:number){
    return Math.max(min,Math.min(max,value));
}

function renderPlanetOrbit(){
    return <div className="planet-orbit" />;
}

function renderPlanetAtmosphere({ planet, glowSize }:PlanetLayerProps){
    return (
        <div
            className="planet-atmosphere"
            style={{
                width: `${glowSize}px`,
                height: `${glowSize}px`,
            }}
        />
    );
}

function renderPlanetRings({ planet, ringSize, moonCount }:PlanetLayerProps){
    const ringCount = planet.hasRing ? Math.floor(planet.commitCount / 10) : 0;
    const showRing = ringCount > 0;

    if (!showRing) {
        return null;
    }

    return (
        <>
            {Array.from({ length: ringCount }).map((_, index) => {
                const sizeOffset = index * 10;
                const tilt = index % 2 === 0 ? -18 : 18;

                return (
                    <div
                        key={`planet-ring-${planet.name}-${index}`}
                        className="planet-rings"
                        style={{
                            width: `${ringSize + sizeOffset}px`,
                            height: `${(ringSize + sizeOffset) * 0.42}px`,
                            transform: `translate(-50%, -50%) rotate(${tilt}deg)`,
                        }}
                    />
                );
            })}
        </>
    );
}

function renderPlanetCore({ planet, planetSize }:PlanetLayerProps){
    return (
        <div
            className="planet-core"
            style={{
                width: `${planetSize}px`,
                height: `${planetSize}px`,
                background: `radial-gradient(circle at 30% 28%, #ffffff 0%, ${planet.color} 35%, #0f172a 100%)`,
                boxShadow: `0 0 24px ${planet.color}55, inset -10px -12px 18px rgba(15, 23, 42, 0.55)`,
            }}
        >
            <div className="planet-surface" />
            <div className="planet-highlight" />
        </div>
    );
}

function renderUserPlanetCore({ planet, planetSize }:PlanetLayerProps){
    return (
        <div
            className="planet-core user-planet-core"
            style={{
                width: `${planetSize}px`,
                height: `${planetSize}px`,
                background: `radial-gradient(circle at 30% 30%, #fff7cc 0%, #ffd76a 24%, ${planet.color} 52%, #7c3b00 100%)`,
                boxShadow: `0 0 34px ${planet.color}aa, 0 0 70px ${planet.color}55, inset -12px -14px 22px rgba(124, 59, 0, 0.35)`,
            }}
        >
            {planet.imageUrl ? (
                <img
                    className="user-planet-avatar"
                    src={planet.imageUrl}
                    alt={`${planet.name} avatar`}
                />
            ) : null}
            <div className="planet-surface user-planet-surface" />
            <div className="planet-highlight user-planet-highlight" />
            <div className="sun-corona sun-corona-outer" />
            <div className="sun-corona sun-corona-inner" />
        </div>
    );
}

function renderPlanetMoons({ planet, planetSize, moonCount }:PlanetLayerProps){
    const visibleMoons = [...planet.moons]
        .sort((left, right) => right.importance - left.importance)
        .slice(0, 4);
    const moonOrbitSize = planetSize + 68;

    function getMoonAngle(index:number){
        const seed = Math.sin((planet.importance + 1) * 17 + (index + 1) * 97 + visibleMoons.length * 31) * 10000;
        const normalizedSeed = seed - Math.floor(seed);
        return normalizedSeed * Math.PI * 2;
    }

    return (
        <div className="planet-moons">
            {visibleMoons.length > 0 ? (
                <div
                    className="moon-orbit-ring"
                    style={{
                        width: `${moonOrbitSize}px`,
                        height: `${moonOrbitSize}px`,
                    }}
                />
            ) : null}
            {visibleMoons.map((moon, index) => {
                const angle = getMoonAngle(index);
                const orbitRadius = moonOrbitSize / 2;
                const moonSize = clamp(Math.max(8, Math.sqrt(moon.size || 1) * 4), 8, 20);
                const x = Math.cos(angle) * orbitRadius;
                const y = Math.sin(angle) * orbitRadius;

                return (
                    <div
                        key={`${moon.name}-${index}`}
                        className="moon"
                        title={moon.name}
                        style={{
                            width: `${moonSize}px`,
                            height: `${moonSize}px`,
                            marginLeft: `${x - moonSize / 2}px`,
                            marginTop: `${y - moonSize / 2}px`,
                        }}
                    />
                );
            })}
        </div>
    );
}

function renderPlanetLabel({ planet, moonCount }:PlanetLayerProps){
    return (
        <div className="planet-label">
            <div className="planet-label-name">{planet.name}</div>
            <div className="planet-label-meta">
                {moonCount} moons
            </div>
        </div>
    );
}

function renderUserPlanetLabel({ planet }:PlanetLayerProps){
    return (
        <div className="planet-label user-planet-label">
            <div className="planet-label-name">{planet.name}</div>
            <div className="planet-label-meta">GitHub sun</div>
        </div>
    );
}

function renderUserPlanet(layerProps:PlanetLayerProps){
    const { glowSize } = layerProps;

    return (
        <>
            <div
                className="planet-atmosphere user-planet-atmosphere"
                style={{
                    width: `${glowSize * 1.15}px`,
                    height: `${glowSize * 1.15}px`,
                    background: "radial-gradient(circle, rgba(255,220,120,0.58) 0%, rgba(255,177,64,0.28) 42%, transparent 74%)",
                }}
            />
            {renderUserPlanetCore(layerProps)}
            {renderUserPlanetLabel(layerProps)}
        </>
    );
}

function RenderPlanet({ planet }:RenderPlanetProps){
    const planetSize = planet.size;
    const glowSize = planetSize * 1.8;
    const ringSize = planetSize * 1.55;
    const moonCount = planet.moons.length;
    const layerProps = {
        planet,
        planetSize,
        glowSize,
        ringSize,
        moonCount,
    };

    return (
        <div
            className="planet-system"
            data-planet-type={planet.isUserPlanet ? "user" : "repo"}
            style={{
                width: `${glowSize + 120}px`,
                height: `${glowSize + 120}px`,
            }}
        >
            {planet.isUserPlanet ? (
                renderUserPlanet(layerProps)
            ) : (
                <>
                    {renderPlanetOrbit()}
                    {renderPlanetAtmosphere(layerProps)}
                    {renderPlanetRings(layerProps)}
                    {renderPlanetCore(layerProps)}
                    {renderPlanetMoons(layerProps)}
                    {renderPlanetLabel(layerProps)}
                </>
            )}
        </div>
    );
}

export default RenderPlanet;
