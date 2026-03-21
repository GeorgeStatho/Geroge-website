import React from "react";
import { Planet } from "../Planets/Planets";
import "./Planet.css";

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
                background: `radial-gradient(circle, ${planet.color}55 0%, ${planet.color}22 45%, transparent 72%)`,
            }}
        />
    );
}

function renderPlanetRings({ planet, ringSize, moonCount }:PlanetLayerProps){
    const showRing =
        planet.hasRing &&
        (planet.importance > 25 || moonCount > 2 || planet.asteroids.length > 0);

    if (!showRing) {
        return null;
    }

    return (
        <div
            className="planet-rings"
            style={{
                width: `${ringSize}px`,
                height: `${ringSize * 0.42}px`,
                border: `2px solid ${planet.color}88`,
                boxShadow: `0 0 12px ${planet.color}44`,
            }}
        />
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
            <div className="planet-surface user-planet-surface" />
            <div className="planet-highlight user-planet-highlight" />
            <div className="sun-corona sun-corona-outer" />
            <div className="sun-corona sun-corona-inner" />
        </div>
    );
}

function renderPlanetMoons({ planet, planetSize, moonCount }:PlanetLayerProps){
    return (
        <div className="planet-moons">
            {planet.moons.slice(0, 5).map((moon, index) => {
                const angle = (Math.PI * 2 * index) / Math.max(moonCount, 1);
                const orbitRadius = planetSize * 0.9 + 26 + index * 14;
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
    const planetSize = clamp(planet.size || planet.importance || 48,36,120);
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
