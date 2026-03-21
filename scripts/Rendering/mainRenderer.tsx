import React from "react";
import { createRoot } from "react-dom/client";
import RenderSolarSystem, { createSolarSystem } from "./RenderSolarSystem";

async function main(){
    const host = document.getElementById("root");
    if (!host) {
        throw new Error('Missing root element with id "root".');
    }

    const root = createRoot(host);
    const system = await createSolarSystem("georgestatho");

    root.render(<RenderSolarSystem system={system} />);
}

main().catch((error) => {
    console.error("Failed to render solar system", error);
});
