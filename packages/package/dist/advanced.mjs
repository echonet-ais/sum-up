import React, { useState, useRef, useEffect, useCallback } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jsxs, jsx } from 'react/jsx-runtime';

// src/components/advanced/AdvancedPageTransition.tsx
function merge(...inputs) {
  return twMerge(clsx(inputs));
}
var cn = merge;
var AdvancedPageTransition = React.forwardRef(({
  children,
  className,
  type = "fade",
  duration = 500,
  easing = "smooth",
  delay = 0,
  autoStart = true,
  onStart,
  onComplete,
  showProgress = false,
  progressClassName
}, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);
  const getEasingFunction = (easingType) => {
    const easingFunctions = {
      linear: (t) => t,
      "ease-in": (t) => t * t,
      "ease-out": (t) => 1 - Math.pow(1 - t, 2),
      "ease-in-out": (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
      bounce: (t) => {
        if (t < 1 / 2.75) return 7.5625 * t * t;
        if (t < 2 / 2.75) return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
        if (t < 2.5 / 2.75) return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
        return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
      },
      elastic: (t) => {
        return Math.pow(2, -10 * t) * Math.sin((t - 0.075) * (2 * Math.PI) / 0.3) + 1;
      },
      smooth: (t) => {
        return t * t * (3 - 2 * t);
      }
    };
    return easingFunctions[easingType];
  };
  const animate = (timestamp) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }
    const elapsed = timestamp - startTimeRef.current;
    const easingFunction = getEasingFunction(easing);
    let currentProgress = Math.min(elapsed / duration, 1);
    currentProgress = easingFunction(currentProgress);
    setProgress(currentProgress);
    setIsVisible(currentProgress > 0.1);
    if (currentProgress < 1) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setIsTransitioning(false);
      setProgress(1);
      onComplete == null ? void 0 : onComplete();
    }
  };
  const startTransition = () => {
    setIsTransitioning(true);
    setProgress(0);
    onStart == null ? void 0 : onStart();
    startTimeRef.current = null;
    animationRef.current = requestAnimationFrame(animate);
  };
  useEffect(() => {
    if (autoStart) {
      const timer = setTimeout(() => {
        startTransition();
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [autoStart, delay]);
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  const getTransitionStyles = () => {
    switch (type) {
      case "fade":
        return {
          opacity: isVisible ? 1 : 0,
          transform: "none"
        };
      case "slide":
        return {
          opacity: isVisible ? 1 : 0,
          transform: `translateX(${(1 - progress) * 100}%)`
        };
      case "slide-up":
        return {
          opacity: isVisible ? 1 : 0,
          transform: `translateY(${(1 - progress) * 100}%)`
        };
      case "slide-down":
        return {
          opacity: isVisible ? 1 : 0,
          transform: `translateY(-${(1 - progress) * 100}%)`
        };
      case "slide-left":
        return {
          opacity: isVisible ? 1 : 0,
          transform: `translateX(-${(1 - progress) * 100}%)`
        };
      case "slide-right":
        return {
          opacity: isVisible ? 1 : 0,
          transform: `translateX(${(1 - progress) * 100}%)`
        };
      case "scale":
        return {
          opacity: isVisible ? 1 : 0,
          transform: `scale(${0.8 + progress * 0.2})`
        };
      case "flip":
        return {
          opacity: isVisible ? 1 : 0,
          transform: `perspective(1000px) rotateY(${(1 - progress) * 90}deg)`
        };
      case "morph":
        return {
          opacity: isVisible ? 1 : 0,
          transform: `scale(${0.9 + progress * 0.1}) rotate(${(1 - progress) * 5}deg)`
        };
      case "cube":
        return {
          opacity: isVisible ? 1 : 0,
          transform: `perspective(1000px) rotateX(${(1 - progress) * 90}deg) rotateY(${(1 - progress) * 45}deg)`
        };
      case "zoom":
        return {
          opacity: isVisible ? 1 : 0,
          transform: `scale(${0.5 + progress * 0.5})`
        };
      default:
        return {
          opacity: isVisible ? 1 : 0,
          transform: "none"
        };
    }
  };
  const transitionStyles = getTransitionStyles();
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    showProgress && /* @__PURE__ */ jsxs("div", { className: cn(
      "fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 shadow-lg border",
      progressClassName
    ), children: [
      /* @__PURE__ */ jsxs("div", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: [
        "Progress: ",
        Math.round(progress * 100),
        "%"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "h-full bg-blue-500 rounded-full transition-all duration-100",
          style: { width: `${progress * 100}%` }
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          "transition-all duration-500 ease-out",
          className
        ),
        style: {
          ...transitionStyles,
          transitionDuration: `${duration}ms`,
          transitionTimingFunction: easing === "smooth" ? "cubic-bezier(0.4, 0, 0.2, 1)" : easing === "bounce" ? "cubic-bezier(0.68, -0.55, 0.265, 1.55)" : easing === "elastic" ? "cubic-bezier(0.175, 0.885, 0.32, 1.275)" : easing
        },
        children
      }
    )
  ] });
});
AdvancedPageTransition.displayName = "AdvancedPageTransition";
var FadePageTransition = React.forwardRef((props, ref) => /* @__PURE__ */ jsx(AdvancedPageTransition, { ref, type: "fade", ...props }));
var SlidePageTransition = React.forwardRef((props, ref) => /* @__PURE__ */ jsx(AdvancedPageTransition, { ref, type: "slide", ...props }));
var ScalePageTransition = React.forwardRef((props, ref) => /* @__PURE__ */ jsx(AdvancedPageTransition, { ref, type: "scale", ...props }));
var FlipPageTransition = React.forwardRef((props, ref) => /* @__PURE__ */ jsx(AdvancedPageTransition, { ref, type: "flip", ...props }));
var MorphPageTransition = React.forwardRef((props, ref) => /* @__PURE__ */ jsx(AdvancedPageTransition, { ref, type: "morph", ...props }));
var CubePageTransition = React.forwardRef((props, ref) => /* @__PURE__ */ jsx(AdvancedPageTransition, { ref, type: "cube", ...props }));
var ZoomPageTransition = React.forwardRef((props, ref) => /* @__PURE__ */ jsx(AdvancedPageTransition, { ref, type: "zoom", ...props }));
FadePageTransition.displayName = "FadePageTransition";
SlidePageTransition.displayName = "SlidePageTransition";
ScalePageTransition.displayName = "ScalePageTransition";
FlipPageTransition.displayName = "FlipPageTransition";
MorphPageTransition.displayName = "MorphPageTransition";
CubePageTransition.displayName = "CubePageTransition";
ZoomPageTransition.displayName = "ZoomPageTransition";
var usePageTransition = (initialConfig = {}) => {
  const [state, setState] = useState({
    isTransitioning: false,
    isVisible: false,
    currentStep: 0,
    progress: 0
  });
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);
  const configRef = useRef({
    type: "fade",
    duration: 500,
    easing: "smooth",
    delay: 0,
    stagger: 0,
    direction: "forward",
    ...initialConfig
  });
  const getEasingFunction = useCallback((easing) => {
    const easingFunctions = {
      linear: (t) => t,
      "ease-in": (t) => t * t,
      "ease-out": (t) => 1 - Math.pow(1 - t, 2),
      "ease-in-out": (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
      bounce: (t) => {
        if (t < 1 / 2.75) return 7.5625 * t * t;
        if (t < 2 / 2.75) return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
        if (t < 2.5 / 2.75) return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
        return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
      },
      elastic: (t) => {
        return Math.pow(2, -10 * t) * Math.sin((t - 0.075) * (2 * Math.PI) / 0.3) + 1;
      },
      smooth: (t) => {
        return t * t * (3 - 2 * t);
      }
    };
    return easingFunctions[easing];
  }, []);
  const animate = useCallback((timestamp) => {
    var _a;
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }
    const elapsed = timestamp - startTimeRef.current;
    const config = configRef.current;
    const easing = getEasingFunction(config.easing);
    let progress = Math.min(elapsed / config.duration, 1);
    progress = easing(progress);
    setState((prev) => ({
      ...prev,
      progress,
      isVisible: config.direction === "forward" ? progress > 0.1 : progress < 0.9,
      currentStep: Math.floor(progress * 10)
    }));
    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setState((prev) => ({
        ...prev,
        isTransitioning: false,
        progress: config.direction === "forward" ? 1 : 0
      }));
      (_a = config.onComplete) == null ? void 0 : _a.call(config);
    }
  }, [getEasingFunction]);
  const start = useCallback(async (config) => {
    return new Promise((resolve) => {
      var _a;
      if (config) {
        configRef.current = { ...configRef.current, ...config };
      }
      const finalConfig = configRef.current;
      finalConfig.onComplete = () => resolve();
      setState((prev) => ({
        ...prev,
        isTransitioning: true,
        progress: finalConfig.direction === "forward" ? 0 : 1
      }));
      startTimeRef.current = null;
      (_a = finalConfig.onStart) == null ? void 0 : _a.call(finalConfig);
      if (finalConfig.delay) {
        setTimeout(() => {
          animationRef.current = requestAnimationFrame(animate);
        }, finalConfig.delay);
      } else {
        animationRef.current = requestAnimationFrame(animate);
      }
    });
  }, [animate]);
  const reverse = useCallback(async () => {
    return new Promise((resolve) => {
      const config = configRef.current;
      config.direction = "backward";
      config.onComplete = () => resolve();
      start();
    });
  }, [start]);
  const pause = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);
  const resume = useCallback(() => {
    if (state.isTransitioning) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [state.isTransitioning, animate]);
  const reset = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setState({
      isTransitioning: false,
      isVisible: false,
      currentStep: 0,
      progress: 0
    });
  }, []);
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  return [state, { start, reverse, pause, resume, reset }];
};
var usePageTransitionManager = (config = {}) => {
  const {
    defaultType = "fade",
    defaultDuration = 500,
    defaultEasing = "smooth",
    enableHistory = true,
    enableProgress = true,
    enableDebug = false
  } = config;
  const [state, setState] = useState({
    isTransitioning: false,
    currentTransition: null,
    transitionHistory: [],
    totalTransitions: 0,
    averageDuration: 0
  });
  const activeTransitionsRef = useRef(/* @__PURE__ */ new Map());
  const transitionCounterRef = useRef(0);
  const logDebug = useCallback((message, data) => {
    if (enableDebug) {
      console.log(`[PageTransitionManager] ${message}`, data);
    }
  }, [enableDebug]);
  const updateStats = useCallback((newTransition) => {
    setState((prev) => {
      const newHistory = enableHistory ? [...prev.transitionHistory, newTransition] : prev.transitionHistory;
      const total = newHistory.length;
      const average = newHistory.reduce((sum, t) => sum + t.duration, 0) / total;
      return {
        ...prev,
        totalTransitions: total,
        averageDuration: average,
        transitionHistory: newHistory
      };
    });
  }, [enableHistory]);
  const startTransition = useCallback(async (config2) => {
    const transitionId = `transition_${++transitionCounterRef.current}`;
    const fullConfig = {
      type: defaultType,
      duration: defaultDuration,
      easing: defaultEasing,
      ...config2
    };
    const transitionEvent = {
      id: transitionId,
      type: fullConfig.type,
      duration: fullConfig.duration,
      easing: fullConfig.easing,
      timestamp: Date.now(),
      status: "pending"
    };
    logDebug("Starting transition", { id: transitionId, config: fullConfig });
    setState((prev) => ({
      ...prev,
      isTransitioning: true,
      currentTransition: transitionEvent
    }));
    const timer = setTimeout(() => {
      var _a;
      const completedEvent = {
        ...transitionEvent,
        status: "completed"
      };
      setState((prev) => ({
        ...prev,
        isTransitioning: false,
        currentTransition: null
      }));
      updateStats(completedEvent);
      activeTransitionsRef.current.delete(transitionId);
      logDebug("Transition completed", { id: transitionId });
      (_a = fullConfig.onComplete) == null ? void 0 : _a.call(fullConfig);
    }, fullConfig.duration);
    activeTransitionsRef.current.set(transitionId, { timer, config: fullConfig });
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        currentTransition: {
          ...prev.currentTransition,
          status: "active"
        }
      }));
    }, 50);
    return transitionId;
  }, [defaultType, defaultDuration, defaultEasing, logDebug, updateStats]);
  const cancelTransition = useCallback((id) => {
    const transition = activeTransitionsRef.current.get(id);
    if (transition) {
      clearTimeout(transition.timer);
      activeTransitionsRef.current.delete(id);
      setState((prev) => {
        var _a;
        return {
          ...prev,
          isTransitioning: activeTransitionsRef.current.size > 0,
          currentTransition: ((_a = prev.currentTransition) == null ? void 0 : _a.id) === id ? null : prev.currentTransition
        };
      });
      logDebug("Transition cancelled", { id });
    }
  }, [logDebug]);
  const pauseAll = useCallback(() => {
    activeTransitionsRef.current.forEach(({ timer }, id) => {
      clearTimeout(timer);
      logDebug("Transition paused", { id });
    });
  }, [logDebug]);
  const resumeAll = useCallback(() => {
    activeTransitionsRef.current.forEach(({ config: config2 }, id) => {
      startTransition(config2);
    });
  }, [startTransition]);
  const clearHistory = useCallback(() => {
    setState((prev) => ({
      ...prev,
      transitionHistory: [],
      totalTransitions: 0,
      averageDuration: 0
    }));
    logDebug("History cleared");
  }, [logDebug]);
  const getTransitionStats = useCallback(() => {
    const { transitionHistory } = state;
    const byType = transitionHistory.reduce((acc, t) => {
      acc[t.type] = (acc[t.type] || 0) + 1;
      return acc;
    }, {});
    const byStatus = transitionHistory.reduce((acc, t) => {
      acc[t.status] = (acc[t.status] || 0) + 1;
      return acc;
    }, {});
    return {
      total: transitionHistory.length,
      average: state.averageDuration,
      byType,
      byStatus
    };
  }, [state]);
  useEffect(() => {
    return () => {
      activeTransitionsRef.current.forEach(({ timer }) => {
        clearTimeout(timer);
      });
      activeTransitionsRef.current.clear();
    };
  }, []);
  return [state, {
    startTransition,
    cancelTransition,
    pauseAll,
    resumeAll,
    clearHistory,
    getTransitionStats
  }];
};

export { AdvancedPageTransition, CubePageTransition, FadePageTransition, FlipPageTransition, MorphPageTransition, ScalePageTransition, SlidePageTransition, ZoomPageTransition, usePageTransition, usePageTransitionManager };
//# sourceMappingURL=advanced.mjs.map
//# sourceMappingURL=advanced.mjs.map