/* eslint-disable no-magic-numbers */
import {
  KeenSliderHooks,
  KeenSliderInstance,
  KeenSliderOptions,
  TrackDetails,
  useKeenSlider,
} from "keen-slider/react";
import { forwardRef, useEffect, useRef, useState } from "react";

import { cn } from "../lib/utils";

type TimePickerProps = {
  startNumber?: number;
  initIdx?: number;
  label?: string;
  length: number;
  loop?: boolean;
  viewPerspective?: "left" | "right" | "center";
  setValue?: (relative: number, absolute: number) => string;
  width: number;
};

const TimePicker = forwardRef<number | string, TimePickerProps>(
  ({ startNumber, initIdx, label, length, loop, viewPerspective, setValue, width }, ref) => {
    const perspective = viewPerspective || "center";
    const wheelSize = 20;
    const slides = length;
    const slideDegree = 360 / wheelSize;
    const slidesPerView = loop ? 9 : 1;
    const [sliderState, setSliderState] = useState<TrackDetails | null>(null);
    const size = useRef(0);
    const options = useRef<KeenSliderOptions>({
      slides: {
        number: slides,
        origin: loop ? "center" : "auto",
        perView: slidesPerView,
      },

      vertical: true,

      initial: initIdx || 0,
      loop: loop,
      dragSpeed: handleDragSpeed,
      created: handleCreated,
      updated: handleUpdated,
      detailsChanged: handleDetailsChanged,
      rubberband: !loop,
      mode: "free-snap",
    });

    const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(options.current);

    const [radius, setRadius] = useState(0);

    useEffect(() => {
      if (sliderState && ref && "current" in ref) {
        const getValue = slideValues()[sliderState.abs].value;

        ref.current = getValue;
      }
    }, [sliderState, ref]);

    useEffect(() => {
      if (slider.current) setRadius(slider.current.size / 2);
    }, [slider]);

    function handleDragSpeed(val: number) {
      const height = size.current;

      return (
        val * (height / ((height / 2) * Math.tan(slideDegree * (Math.PI / 180))) / slidesPerView)
      );
    }

    function handleCreated(s: KeenSliderInstance<object, object, KeenSliderHooks>) {
      size.current = s.size;
    }

    function handleUpdated(s: KeenSliderInstance<object, object, KeenSliderHooks>) {
      size.current = s.size;
    }

    function handleDetailsChanged(s: KeenSliderInstance<object, object, KeenSliderHooks>) {
      setSliderState(s.track.details);
    }

    function slideValues() {
      if (!sliderState) return [];
      const offset = loop ? 1 / 2 - 1 / slidesPerView / 2 : 0;

      const values = [];
      for (let i = 0; i < slides; i += 1) {
        const distance = sliderState
          ? (sliderState.slides[i].distance - offset) * slidesPerView
          : 0;
        const rotate = Math.abs(distance) > wheelSize / 2 ? 180 : distance * (360 / wheelSize) * -1;
        const style = {
          transform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
          WebkitTransform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
        };
        const currentValue = i + (startNumber || 0);
        const value = setValue
          ? setValue(i, sliderState.abs + Math.round(distance))
          : Math.floor(currentValue / 10) < 1
            ? `0${currentValue}`
            : currentValue;

        values.push({ style, value });
      }

      return values;
    }

    return (
      <div
        className={cn(
          "text-text-primary h-full w-full overflow-visible",
          perspective === "right" && "perspective-origin-[calc(50%+100px)_50%] translate-x-[10px]",
          perspective === "left" && "perspective-origin-[calc(50%-100px)_50%] translate-x-[-10px]",
        )}
        ref={sliderRef}
      >
        <div
          className="z-5 relative left-0 -mt-[2px] h-[calc(42%+2px)] w-full border-b border-white/30 bg-gradient-to-b from-black/90 to-black/50"
          style={{
            transform: `translateZ(${radius}px)`,
            WebkitTransform: `translateZ(${radius}px)`,
          }}
        />
        <div className="perspective-[1000px] transform-style-preserve-3d flex h-[16%] w-full items-center justify-center">
          <div className="relative h-full w-full" style={{ width: width + "px" }}>
            {slideValues().map(({ style, value }, idx) => (
              <div
                className="backface-hidden absolute flex h-full w-full items-center justify-end text-[20px] font-normal"
                style={style}
                key={`${value}-${idx}`}
              >
                <span className="font-mono">{value}</span>
              </div>
            ))}
          </div>
          {label && (
            <div
              className="ml-1 mt-1 text-sm font-medium leading-tight"
              style={{
                transform: `translateZ(${radius}px)`,
                WebkitTransform: `translateZ(${radius}px)`,
              }}
            >
              {label}
            </div>
          )}
        </div>
        <div
          className="border-b-none z-5 relative left-0 mt-[2px] h-[calc(42%+2px)] w-full border-t border-t-white/30 bg-gradient-to-b from-black/90 to-black/50"
          style={{
            transform: `translateZ(${radius}px)`,
            WebkitTransform: `translateZ(${radius}px)`,
          }}
        />
      </div>
    );
  },
);

TimePicker.displayName = "TimePicker";

export default TimePicker;
