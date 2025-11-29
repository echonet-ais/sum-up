import React__default from 'react';

type TransitionType$1 = 'fade' | 'slide' | 'scale' | 'flip' | 'morph' | 'cube' | 'zoom' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right';
type TransitionEasing$1 = 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'bounce' | 'elastic' | 'smooth';
interface AdvancedPageTransitionProps {
    children: React__default.ReactNode;
    className?: string;
    type?: TransitionType$1;
    duration?: number;
    easing?: TransitionEasing$1;
    delay?: number;
    autoStart?: boolean;
    onStart?: () => void;
    onComplete?: () => void;
    showProgress?: boolean;
    progressClassName?: string;
}
declare const AdvancedPageTransition: React__default.ForwardRefExoticComponent<AdvancedPageTransitionProps & React__default.RefAttributes<HTMLDivElement>>;
declare const FadePageTransition: React__default.ForwardRefExoticComponent<Omit<AdvancedPageTransitionProps, "type"> & React__default.RefAttributes<HTMLDivElement>>;
declare const SlidePageTransition: React__default.ForwardRefExoticComponent<Omit<AdvancedPageTransitionProps, "type"> & React__default.RefAttributes<HTMLDivElement>>;
declare const ScalePageTransition: React__default.ForwardRefExoticComponent<Omit<AdvancedPageTransitionProps, "type"> & React__default.RefAttributes<HTMLDivElement>>;
declare const FlipPageTransition: React__default.ForwardRefExoticComponent<Omit<AdvancedPageTransitionProps, "type"> & React__default.RefAttributes<HTMLDivElement>>;
declare const MorphPageTransition: React__default.ForwardRefExoticComponent<Omit<AdvancedPageTransitionProps, "type"> & React__default.RefAttributes<HTMLDivElement>>;
declare const CubePageTransition: React__default.ForwardRefExoticComponent<Omit<AdvancedPageTransitionProps, "type"> & React__default.RefAttributes<HTMLDivElement>>;
declare const ZoomPageTransition: React__default.ForwardRefExoticComponent<Omit<AdvancedPageTransitionProps, "type"> & React__default.RefAttributes<HTMLDivElement>>;

type TransitionType = 'fade' | 'slide' | 'scale' | 'flip' | 'morph' | 'cube' | 'zoom' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right';
type TransitionEasing = 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'bounce' | 'elastic' | 'smooth';
interface TransitionConfig {
    type: TransitionType;
    duration: number;
    easing: TransitionEasing;
    delay?: number;
    stagger?: number;
    direction?: 'forward' | 'backward';
    onStart?: () => void;
    onComplete?: () => void;
    onReverse?: () => void;
}
interface PageTransitionState {
    isTransitioning: boolean;
    isVisible: boolean;
    currentStep: number;
    progress: number;
}
interface PageTransitionControls {
    start: (config?: Partial<TransitionConfig>) => Promise<void>;
    reverse: () => Promise<void>;
    pause: () => void;
    resume: () => void;
    reset: () => void;
}
declare const usePageTransition: (initialConfig?: Partial<TransitionConfig>) => [PageTransitionState, PageTransitionControls];

interface PageTransitionManagerConfig {
    defaultType?: TransitionType;
    defaultDuration?: number;
    defaultEasing?: TransitionEasing;
    enableHistory?: boolean;
    enableProgress?: boolean;
    enableDebug?: boolean;
}
interface PageTransitionEvent {
    id: string;
    type: TransitionType;
    duration: number;
    easing: TransitionEasing;
    timestamp: number;
    status: 'pending' | 'active' | 'completed' | 'failed';
}
interface PageTransitionManagerState {
    isTransitioning: boolean;
    currentTransition: PageTransitionEvent | null;
    transitionHistory: PageTransitionEvent[];
    totalTransitions: number;
    averageDuration: number;
}
interface PageTransitionManagerControls {
    startTransition: (config: Partial<TransitionConfig>) => Promise<string>;
    cancelTransition: (id: string) => void;
    pauseAll: () => void;
    resumeAll: () => void;
    clearHistory: () => void;
    getTransitionStats: () => {
        total: number;
        average: number;
        byType: Record<TransitionType, number>;
        byStatus: Record<string, number>;
    };
}
declare const usePageTransitionManager: (config?: PageTransitionManagerConfig) => [PageTransitionManagerState, PageTransitionManagerControls];

export { AdvancedPageTransition, type AdvancedPageTransitionProps, CubePageTransition, FadePageTransition, FlipPageTransition, MorphPageTransition, ScalePageTransition, SlidePageTransition, type TransitionEasing$1 as TransitionEasing, type TransitionType$1 as TransitionType, ZoomPageTransition, usePageTransition, usePageTransitionManager };
