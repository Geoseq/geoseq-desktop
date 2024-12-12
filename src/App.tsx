import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import "./index.css"
import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-2">菜单栏</header>
      <div className="flex flex-1">
        <div className="w-1/6 bg-gray-100 p-2">图层面板</div>
        <main className="flex-1 relative">
          <div id="map" className="absolute inset-0">
            <Map
              initialViewState={{
                longitude: 120,
                latitude: 30,
                zoom: 8
              }}
              style={{ flexGrow: "inherit" }}
              mapStyle={{
                version: 8,
                name,
                sources: {
                  base_map: {
                    type: 'raster',
                    tileSize: 256,
                    tiles: ['https://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=e81d2c58360ac1527eb160fe214e21fe'],
                  }
                },
                layers: [
                  {
                    id: 'base_map',
                    source: 'base_map',
                    type: 'raster'
                  }
                ],
                zoom: 8,
              }}
            />
          </div>
        </main>
        <div className="w-1/6 bg-gray-100 p-2">属性面板</div>
      </div>
      <footer className="bg-gray-800 text-white p-2">状态栏</footer>
    </div>

  );
}

export default App;
