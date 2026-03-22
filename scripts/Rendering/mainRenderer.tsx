import React from "react";
import { createRoot } from "react-dom/client";
import RenderSolarSystem from "./RenderSolarSystem";
import { createSolarSystem } from "./SolarSystemHelpers";

async function main(){
    const host = document.createElement("div");
    host.id = "solar-system-root";
    document.body.appendChild(host);

    const root = createRoot(host);
    const system = await createSolarSystem("njbrake");

    root.render(<RenderSolarSystem system={system} />);
}

main().catch((error) => {
    console.error("Failed to render solar system", error);
});
