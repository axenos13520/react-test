import React, { useEffect, useState } from "react";
import WindowPanelButton from "../WindowPanelButton";

export default function MyModal({ children, visible, setVisible }) {
  const [position, setPosition] = useState([0, 0]);
  const [dragging, setDragging] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState([0, 0]);
  const [windowClasses, setWindowClasses] = useState([]);
  const [windowOpacity, setWindowOpacity] = useState(0);
  const [hiddenClass, setHiddenClass] = useState("hidden");

  function CloseWindow() {
    setWindowOpacity(0);

    new Promise((resolve) => setTimeout(resolve, 150)).then((res) => {
      setHiddenClass("hidden");
      setVisible(false);
    });
  }

  function OnMouseDown({ clientX, clientY }) {
    if (clientY - position[1] <= 30) {
      setDragging(true);
      setWindowClasses([...windowClasses, "cursor-grabbing"]);
      setLastMousePosition([clientX, clientY]);
    }
  }

  function OnMouseUp() {
    setDragging(false);
    setWindowClasses(windowClasses.filter((c) => c != "cursor-grabbing"));
  }

  function OnMouseMove({ clientX, clientY }) {
    if (!dragging) return;

    setPosition([
      position[0] + clientX - lastMousePosition[0],
      position[1] + clientY - lastMousePosition[1],
    ]);

    setLastMousePosition([clientX, clientY]);
  }

  if (visible && hiddenClass != "") {
    setHiddenClass("");

    new Promise((res) => setTimeout(res, 10)).then((res) =>
      setWindowOpacity(100)
    );
  }

  return (
    <div
      onMouseMove={OnMouseMove}
      onMouseUp={OnMouseUp}
      className={
        "fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-0 " +
        hiddenClass
      }
    >
      <div
        className={
          `transition-opacity duration-300 ease-out absolute p-6 pt-10 min-w-64 h-min rounded-lg bg-slate-200 border-4 border-slate-400 shadow-lg shadow-slate-300 ` +
          windowClasses.join(" ")
        }
        onMouseDown={OnMouseDown}
        style={{ left: position[0], top: position[1], opacity: windowOpacity }}
      >
        <div className="absolute right-1 top-1 flex flex-row justify-between w-12">
          <WindowPanelButton className="bg-green-500" />
          <WindowPanelButton className="bg-yellow-500" />
          <WindowPanelButton className="bg-red-500" onClick={CloseWindow} />
        </div>
        {children}
      </div>
    </div>
  );
}
