import { controls, evalScope } from "@strudel.cycles/core";
import {
  CodeMirror,
  useHighlighting,
  useKeydown,
  useStrudel,
  flash,
} from "@strudel.cycles/react";
import {
  getAudioContext,
  initAudioOnFirstClick,
  panic,
  webaudioOutput,
} from "@strudel.cycles/webaudio";
import { useCallback, useState } from "react";
import "./style.css";
// import { prebake } from '../../../../../repl/src/prebake.mjs';
import Sketch from "react-p5";

import {preload, setup, draw, mouseClicked, mouseDragged} from "./draw-to-dweet.js"

initAudioOnFirstClick();

// TODO: only import stuff when play is pressed?
evalScope(
  controls,
  import("@strudel.cycles/core"),
  import("@strudel.cycles/tonal"),
  import("@strudel.cycles/mini"),
  import("@strudel.cycles/xen"),
  import("@strudel.cycles/webaudio"),
  import("@strudel.cycles/osc")
);

const defaultTune = `samples('github:tidalcycles/Dirt-Samples/master/');
s("bd sd")`;

// await prebake();

const ctx = getAudioContext();
const getTime = () => ctx.currentTime;
function App() {
  const [code, setCode] = useState(defaultTune);
  const [view, setView] = useState();
  // const [code, setCode] = useState(`"c3".note().slow(2)`);
  const {
    scheduler,
    evaluate,
    schedulerError,
    evalError,
    isDirty,
    activeCode,
    pattern,
    started,
  } = useStrudel({
    code,
    defaultOutput: webaudioOutput,
    getTime,
  });

  useHighlighting({
    view,
    pattern,
    active: started && !activeCode?.includes("strudel disable-highlighting"),
    getTime: () => scheduler.now(),
  });

  const error = evalError || schedulerError;
  useKeydown(
    useCallback(
      async (e) => {
        if (e.ctrlKey || e.altKey) {
          if (e.code === "Enter") {
            e.preventDefault();
            flash(view);
            await evaluate(code);
            if (e.shiftKey) {
              panic();
              scheduler.stop();
              scheduler.start();
            }
            if (!scheduler.started) {
              scheduler.start();
            }
          } else if (e.code === "Period") {
            scheduler.stop();
            panic();
            e.preventDefault();
          }
        }
      },
      [scheduler, evaluate, view]
    )
  );
  return (
    <div>
      <nav className="z-[12] w-full flex justify-center fixed bottom-0">
        <div className="bg-slate-500 space-x-2 px-2 rounded-t-md">
          <button
            onClick={async () => {
              await evaluate(code);
              scheduler.start();
            }}
          >
            start
          </button>
          <button onClick={() => scheduler.stop()}>stop</button>
          {isDirty && <button onClick={() => evaluate(code)}>eval</button>}
        </div>
        {error && <p>error {error.message}</p>}
      </nav>
      <div className="w-full flex flex-row">
        <div className="basis-2/3">
          <CodeMirror value={code} onChange={setCode} onViewChanged={setView} />
        </div>
        <div className="basis-1/3">
          <Sketch preload={preload} setup={setup} draw={draw} mouseClicked={mouseClicked} mouseDragged={mouseDragged} />
        </div>
      </div>
    </div>
  );
}

export default App;
