import {lazy, StrictMode, Suspense} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router";
import {Fallback} from "./Fallback";
import {Layout} from "./Layout";
import "./index.css";

const HomePage = lazy(() => import("@home/index"));
const GameOfLifePage = lazy(() => import("@game-of-life/index"));

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Suspense fallback={<Fallback />}>
                <Routes>
                    <Route element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="/game-of-life" element={<GameOfLifePage />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    </StrictMode>,
);
