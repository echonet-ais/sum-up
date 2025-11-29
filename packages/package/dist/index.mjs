import * as React61 from 'react';
import React61__default, { useState, useEffect, useRef, createContext, useCallback, useContext } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as LucideIcons from 'lucide-react';
import { Atom, Microscope, TestTube, Beaker, Diamond, Gem, Crown, Medal, Trophy, Award, GraduationCap, Lightbulb, Target, Rocket, Brain, Code, Book, Sparkles, Gauge, Sidebar, Square, ToggleLeft, MousePointer, Layers, BookOpen, Palette, CalendarClock, CalendarMinus, CalendarPlus, CalendarX, CalendarCheck, CalendarDays, Umbrella, Droplets, Thermometer, Wind, CloudFog, CloudLightning, CloudSnow, CircleSlash, CircleDot, Circle, BookmarkMinus, BookmarkPlus, StarOff, HeartOff, ListChecks, ListOrdered, List, AlignJustify, AlignRight, AlignCenter, AlignLeft, Strikethrough, Underline, Italic, Bold, Type, Scissors, Redo, Undo, SaveAll, Save, FlagTriangleRight, Flag, Globe2, Globe, Compass, Navigation2, Navigation, Codesandbox, Codepen, Chrome, Figma, Slack, Github, Twitch, Youtube, Linkedin, Instagram, Twitter, Facebook, MailSearch, MailMinus, MailPlus, MailX, MailCheck, MailOpen, PhoneOff, PhoneMissed, PhoneOutgoing, PhoneIncoming, PhoneCall, MessageSquare, LogOut, LogIn, Fingerprint, Key, ShieldAlert, ShieldCheck, FileSearch, FileEdit, FileMinus, FilePlus, FileX, FileCheck, FileSpreadsheet, FileCode, FileArchive, FileAudio, FileVideo, FileImage, File, UserCog, UserX, UserCheck, UserMinus, UserPlus, Users, Building2, Building, Briefcase, Minimize, Maximize, RotateCw, RotateCcw, Vibrate, Volume1, Volume, BatteryCharging, Battery, Signal, Bluetooth, WifiOff, Wifi, Laptop, Monitor, Tablet, Smartphone, LineChart, BarChart, PiggyBank, Wallet, Receipt, Calculator, Percent, Tag, Store, Truck, Package, ShoppingBag, ShoppingCart, Bitcoin, PoundSterling, Euro, DollarSign, CreditCard, CloudRain, Cloud, Moon, Sun, Zap, Shield, Unlock, Lock, EyeOff, Eye, HelpCircle, XCircle, CheckCircle, RefreshCw, Loader2, Timer, Clock, Calendar, Folder, FileText, Database, Activity, TrendingDown, TrendingUp, PieChart, BarChart3, ThumbsDown, ThumbsUp, Angry, Laugh, Meh, Frown, Smile, Headphones, Mic, Camera, Image, Video, Music, VolumeX, Volume2, SkipForward, SkipBack, Pause, Play, ExternalLink, Link as Link$1, Copy, Forward, Reply, Send, Mail, Phone, MessageCircle, Waves, Hand, FlaskConical, Maximize2, MoreVertical, MoreHorizontal, MoveHorizontal, Move, ArrowRightLeft, ArrowDown, ArrowUp, ArrowRight, ArrowLeft, CheckSquare, Inbox, Columns, LayoutDashboard, ChevronRight, ChevronLeft, ChevronUp, ChevronDown, AlertCircle, Info, Check, Minus, Plus, Trash2, Edit, Upload, Download, Share, Bookmark, Star, Heart, Bell, User, Settings, Search, X, Menu, Home } from 'lucide-react';

// src/components/Button.tsx
function merge(...inputs) {
  return twMerge(clsx(inputs));
}
function mergeIf(condition, trueClass, falseClass) {
  return merge(condition ? trueClass : falseClass || "");
}
function mergeMap(classMap) {
  const classes = Object.entries(classMap).filter(([, condition]) => condition).map(([className]) => className);
  return merge(...classes);
}
var cn = merge;
var isBrowser = typeof window !== "undefined";
function useReducedMotion() {
  const [reduce, setReduce] = React61.useState(false);
  React61.useEffect(() => {
    var _a;
    if (!isBrowser || !("matchMedia" in window)) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduce(!!mq.matches);
    onChange();
    (_a = mq.addEventListener) == null ? void 0 : _a.call(mq, "change", onChange);
    return () => {
      var _a2;
      return (_a2 = mq.removeEventListener) == null ? void 0 : _a2.call(mq, "change", onChange);
    };
  }, []);
  return reduce;
}
var ButtonInner = React61.forwardRef(function ButtonInner2({
  variant = "default",
  size = "md",
  loading = false,
  icon,
  iconPosition = "left",
  gradient = "blue",
  customGradient,
  rounded = "md",
  shadow = "md",
  hover = "scale",
  fullWidth,
  iconOnly,
  className,
  children,
  disabled,
  ...rest
}, ref) {
  const reduced = useReducedMotion();
  const variantClasses = {
    default: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
    destructive: "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600",
    outline: "border-2 border-blue-600 bg-transparent text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
    link: "bg-transparent text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300",
    gradient: `bg-gradient-to-r ${customGradient || getGradientClass(gradient)} text-white hover:shadow-lg`,
    neon: "bg-gray-900 text-cyan-400 border border-cyan-400/30 shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40",
    glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
  };
  const sizeClasses2 = {
    sm: "h-8 px-3 py-1 text-sm",
    md: "h-10 px-4 py-2 text-base",
    lg: "h-12 px-6 py-3 text-lg",
    xl: "h-14 px-8 py-4 text-xl",
    icon: "h-10 w-10 p-0"
  };
  const roundedClasses = {
    sm: "rounded",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full"
  };
  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl"
  };
  const hoverClasses = {
    scale: reduced ? "" : "hover:scale-105 transition-transform duration-200",
    glow: reduced ? "" : "hover:shadow-2xl hover:shadow-blue-500/25 dark:hover:shadow-cyan-400/25 transition-shadow duration-300",
    slide: reduced ? "" : "hover:-translate-y-1 transition-transform duration-200",
    none: ""
  };
  const base = merge(
    "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50 min-w-fit",
    fullWidth && "w-full",
    variantClasses[variant],
    sizeClasses2[size],
    roundedClasses[rounded],
    shadowClasses[shadow],
    hoverClasses[hover],
    className
  );
  const Spinner = /* @__PURE__ */ jsxs("span", { role: "status", "aria-live": "polite", className: "-ml-1 mr-2 inline-flex", children: [
    /* @__PURE__ */ jsxs("svg", { className: "animate-spin h-4 w-4", viewBox: "0 0 24 24", fill: "none", children: [
      /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
      /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
    ] }),
    /* @__PURE__ */ jsx("span", { className: "sr-only", children: "\uB85C\uB529 \uC911" })
  ] });
  const content = /* @__PURE__ */ jsxs(Fragment, { children: [
    loading && Spinner,
    !loading && icon && iconPosition === "left" && /* @__PURE__ */ jsx("span", { className: "mr-2", children: icon }),
    children,
    !loading && icon && iconPosition === "right" && /* @__PURE__ */ jsx("span", { className: "ml-2", children: icon })
  ] });
  if (iconOnly && !("aria-label" in rest) && true) {
    console.warn("[Button] iconOnly \uC0AC\uC6A9 \uC2DC aria-label\uC744 \uC81C\uACF5\uD558\uC138\uC694.");
  }
  if ("href" in rest && rest.href) {
    const { onClick, target, rel, href, ...anchorProps } = rest;
    const isDisabled = !!disabled || loading;
    const handleAnchorClick = (e) => {
      if (isDisabled) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      onClick == null ? void 0 : onClick(e);
    };
    return /* @__PURE__ */ jsx(
      "a",
      {
        ref,
        href,
        className: base,
        onClick: handleAnchorClick,
        "aria-disabled": isDisabled || void 0,
        tabIndex: isDisabled ? -1 : anchorProps.tabIndex,
        target,
        rel: target === "_blank" ? rel != null ? rel : "noopener noreferrer" : rel,
        ...anchorProps,
        children: content
      }
    );
  }
  const btnProps = rest;
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      className: base,
      type: "button",
      disabled: disabled || loading,
      "aria-busy": loading || void 0,
      ...btnProps,
      children: content
    }
  );
});
ButtonInner.displayName = "Button";
var Button = ButtonInner;
function getGradientClass(gradient) {
  const g = {
    blue: "from-blue-500 to-cyan-500",
    purple: "from-purple-500 to-pink-500",
    green: "from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400",
    orange: "from-orange-500 to-red-500 dark:from-orange-300 dark:to-red-300",
    pink: "from-pink-500 to-rose-500"
  };
  return g[gradient] || g.blue;
}
var isBrowser2 = typeof window !== "undefined";
function useReducedMotion2() {
  const [reduce, setReduce] = React61.useState(false);
  React61.useEffect(() => {
    var _a;
    if (!isBrowser2 || !("matchMedia" in window)) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduce(!!mq.matches);
    onChange();
    (_a = mq.addEventListener) == null ? void 0 : _a.call(mq, "change", onChange);
    return () => {
      var _a2;
      return (_a2 = mq.removeEventListener) == null ? void 0 : _a2.call(mq, "change", onChange);
    };
  }, []);
  return reduce;
}
var Action = React61.forwardRef(
  ({
    className,
    children,
    actionType = "primary",
    feedback = "ripple",
    particleEffect = false,
    rippleEffect = false,
    soundEffect = false,
    hapticFeedback = false,
    transparency = 1,
    blurIntensity = 0,
    glowIntensity = 0,
    glowColor = "rgba(91,140,255,.8)",
    loading = false,
    iconOnly = false,
    disabled,
    ...rest
  }, ref) => {
    const reduced = useReducedMotion2();
    const runEffects = React61.useCallback(() => {
      var _a;
      if (hapticFeedback && isBrowser2 && "vibrate" in navigator && !reduced) {
        try {
          (_a = navigator.vibrate) == null ? void 0 : _a.call(navigator, 30);
        } catch {
        }
      }
    }, [hapticFeedback, soundEffect, rippleEffect, particleEffect, reduced]);
    const styleVars = React61.useMemo(() => ({
      "--action-opacity": String(transparency),
      "--action-blur": `${blurIntensity}px`,
      "--action-glow-size": `${glowIntensity}px`,
      "--action-glow-color": glowColor
    }), [transparency, blurIntensity, glowIntensity, glowColor]);
    const cls = React61.useMemo(
      () => merge(
        "hua-action relative inline-flex items-center rounded-xl px-4 py-2 font-medium",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
        loading && "cursor-wait opacity-80",
        iconOnly && "justify-center",
        className
      ),
      [className, loading, iconOnly]
    );
    if ("href" in rest && rest.href) {
      const { onClick: onClick2, href, ...anchorRest } = rest;
      const handleClick2 = (e) => {
        if (disabled || loading) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        runEffects();
        onClick2 == null ? void 0 : onClick2(e);
      };
      return /* @__PURE__ */ jsx(
        Button,
        {
          ref,
          href,
          className: cls,
          style: styleVars,
          onClick: handleClick2,
          "aria-busy": loading || void 0,
          "aria-label": iconOnly ? anchorRest["aria-label"] : void 0,
          "data-action": actionType,
          "data-feedback": feedback,
          "data-reduced-motion": reduced ? "true" : "false",
          disabled,
          ...anchorRest,
          children
        }
      );
    }
    const { onClick, ...btnRest } = rest;
    const handleClick = (e) => {
      if (disabled || loading) return;
      runEffects();
      onClick == null ? void 0 : onClick(e);
    };
    return /* @__PURE__ */ jsx(
      Button,
      {
        ref,
        className: cls,
        style: styleVars,
        onClick: handleClick,
        disabled,
        "aria-busy": loading || void 0,
        "aria-label": iconOnly ? btnRest["aria-label"] : void 0,
        "data-action": actionType,
        "data-feedback": feedback,
        "data-reduced-motion": reduced ? "true" : "false",
        ...btnRest,
        children
      }
    );
  }
);
Action.displayName = "Action";
var Input = React61.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
function Link({
  href,
  children,
  className,
  variant = "default",
  size = "md",
  external = false,
  onClick
}) {
  const variantClasses = {
    default: "text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300",
    primary: "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300",
    secondary: "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200",
    ghost: "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:bg-gray-800",
    underline: "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline hover:no-underline"
  };
  const sizeClasses2 = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };
  return /* @__PURE__ */ jsx(
    "a",
    {
      href,
      className: cn(
        "transition-colors duration-200",
        variantClasses[variant],
        sizeClasses2[size],
        className
      ),
      target: external ? "_blank" : void 0,
      rel: external ? "noopener noreferrer" : void 0,
      onClick,
      children
    }
  );
}
var icons = {
  // Navigation & UI
  home: Home,
  menu: Menu,
  close: X,
  search: Search,
  settings: Settings,
  user: User,
  bell: Bell,
  heart: Heart,
  star: Star,
  bookmark: Bookmark,
  share: Share,
  download: Download,
  upload: Upload,
  edit: Edit,
  delete: Trash2,
  add: Plus,
  remove: Minus,
  check: Check,
  alertCircle: AlertCircle,
  info: Info,
  warning: AlertCircle,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  "layout-dashboard": LayoutDashboard,
  columns: Columns,
  inbox: Inbox,
  checkSquare: CheckSquare,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  arrowUp: ArrowUp,
  arrowDown: ArrowDown,
  arrowRightLeft: ArrowRightLeft,
  move: Move,
  "move-horizontal": MoveHorizontal,
  moreHorizontal: MoreHorizontal,
  moreVertical: MoreVertical,
  "maximize-2": Maximize2,
  "flask-conical": FlaskConical,
  hand: Hand,
  waves: Waves,
  // Communication
  message: MessageCircle,
  phone: Phone,
  mail: Mail,
  send: Send,
  reply: Reply,
  forward: Forward,
  copy: Copy,
  link: Link$1,
  externalLink: ExternalLink,
  // Media
  play: Play,
  pause: Pause,
  skipBack: SkipBack,
  skipForward: SkipForward,
  volume: Volume2,
  mute: VolumeX,
  music: Music,
  video: Video,
  image: Image,
  camera: Camera,
  mic: Mic,
  headphones: Headphones,
  // Emotions
  smile: Smile,
  frown: Frown,
  meh: Meh,
  laugh: Laugh,
  angry: Angry,
  thumbsUp: ThumbsUp,
  thumbsDown: ThumbsDown,
  // Data & Analytics
  chart: BarChart3,
  pieChart: PieChart,
  trendingUp: TrendingUp,
  trendingDown: TrendingDown,
  activity: Activity,
  database: Database,
  fileText: FileText,
  folder: Folder,
  calendar: Calendar,
  clock: Clock,
  timer: Timer,
  // Status & Feedback
  loader: Loader2,
  refresh: RefreshCw,
  success: CheckCircle,
  error: XCircle,
  helpCircle: HelpCircle,
  eye: Eye,
  eyeOff: EyeOff,
  lock: Lock,
  unlock: Unlock,
  shield: Shield,
  zap: Zap,
  sun: Sun,
  moon: Moon,
  cloud: Cloud,
  rain: CloudRain,
  // Finance
  creditCard: CreditCard,
  dollarSign: DollarSign,
  euro: Euro,
  poundSterling: PoundSterling,
  bitcoin: Bitcoin,
  shoppingCart: ShoppingCart,
  shoppingBag: ShoppingBag,
  package: Package,
  truck: Truck,
  store: Store,
  tag: Tag,
  percent: Percent,
  calculator: Calculator,
  receipt: Receipt,
  wallet: Wallet,
  piggyBank: PiggyBank,
  barChart: BarChart,
  lineChart: LineChart,
  // Mobile & App
  smartphone: Smartphone,
  tablet: Tablet,
  monitor: Monitor,
  laptop: Laptop,
  wifi: Wifi,
  wifiOff: WifiOff,
  bluetooth: Bluetooth,
  signal: Signal,
  battery: Battery,
  batteryCharging: BatteryCharging,
  volume1: Volume,
  volume2: Volume1,
  vibrate: Vibrate,
  rotateCcw: RotateCcw,
  rotateCw: RotateCw,
  maximize: Maximize,
  minimize: Minimize,
  // Business
  briefcase: Briefcase,
  building: Building,
  building2: Building2,
  users: Users,
  userPlus: UserPlus,
  userMinus: UserMinus,
  userCheck: UserCheck,
  userX: UserX,
  userCog: UserCog,
  // Files
  file: File,
  fileImage: FileImage,
  fileVideo: FileVideo,
  fileAudio: FileAudio,
  fileArchive: FileArchive,
  fileCode: FileCode,
  fileSpreadsheet: FileSpreadsheet,
  fileCheck: FileCheck,
  fileX: FileX,
  filePlus: FilePlus,
  fileMinus: FileMinus,
  fileEdit: FileEdit,
  fileSearch: FileSearch,
  // Security & Authentication
  shieldCheck: ShieldCheck,
  shieldAlert: ShieldAlert,
  key: Key,
  fingerprint: Fingerprint,
  logIn: LogIn,
  logOut: LogOut,
  // Communication Extended
  messageSquare: MessageSquare,
  phoneCall: PhoneCall,
  phoneIncoming: PhoneIncoming,
  phoneOutgoing: PhoneOutgoing,
  phoneMissed: PhoneMissed,
  phoneOff: PhoneOff,
  mailOpen: MailOpen,
  mailCheck: MailCheck,
  mailX: MailX,
  mailPlus: MailPlus,
  mailMinus: MailMinus,
  mailSearch: MailSearch,
  // Social Media
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  twitch: Twitch,
  github: Github,
  slack: Slack,
  figma: Figma,
  chrome: Chrome,
  codepen: Codepen,
  codesandbox: Codesandbox,
  // Navigation Extended
  navigation: Navigation,
  navigation2: Navigation2,
  compass: Compass,
  globe: Globe,
  globe2: Globe2,
  flag: Flag,
  flagTriangleRight: FlagTriangleRight,
  // Actions Extended
  save: Save,
  saveAll: SaveAll,
  undo: Undo,
  redo: Redo,
  scissors: Scissors,
  type: Type,
  bold: Bold,
  italic: Italic,
  underline: Underline,
  strikethrough: Strikethrough,
  alignLeft: AlignLeft,
  alignCenter: AlignCenter,
  alignRight: AlignRight,
  alignJustify: AlignJustify,
  list: List,
  listOrdered: ListOrdered,
  listChecks: ListChecks,
  // Feedback Extended
  heartOff: HeartOff,
  starOff: StarOff,
  bookmarkPlus: BookmarkPlus,
  bookmarkMinus: BookmarkMinus,
  // Status Extended
  circle: Circle,
  circleDot: CircleDot,
  circleSlash: CircleSlash,
  // Weather Extended
  cloudSnow: CloudSnow,
  cloudLightning: CloudLightning,
  cloudFog: CloudFog,
  wind: Wind,
  thermometer: Thermometer,
  droplets: Droplets,
  umbrella: Umbrella,
  // Time & Date
  calendarDays: CalendarDays,
  calendarCheck: CalendarCheck,
  calendarX: CalendarX,
  calendarPlus: CalendarPlus,
  calendarMinus: CalendarMinus,
  calendarClock: CalendarClock,
  // 추가된 누락 아이콘들
  palette: Palette,
  bookOpen: BookOpen,
  layers: Layers,
  mousePointer: MousePointer,
  toggleLeft: ToggleLeft,
  square: Square,
  sidebar: Sidebar,
  gauge: Gauge,
  sparkles: Sparkles,
  // 문서 페이지용 아이콘들
  book: Book,
  code: Code,
  brain: Brain,
  rocket: Rocket,
  target: Target,
  lightbulb: Lightbulb,
  graduationCap: GraduationCap,
  award: Award,
  trophy: Trophy,
  medal: Medal,
  crown: Crown,
  gem: Gem,
  diamond: Diamond,
  // Science & Lab
  beaker: Beaker,
  testTube: TestTube,
  microscope: Microscope,
  atom: Atom
};
var iconCategories = {
  navigation: ["home", "menu", "close", "search", "settings", "user", "bell", "navigation", "compass", "globe", "flag", "sidebar"],
  actions: ["edit", "delete", "add", "remove", "check", "share", "download", "upload", "save", "undo", "redo", "copy", "scissors", "mousePointer", "toggleLeft"],
  communication: ["message", "phone", "mail", "send", "reply", "forward", "messageSquare", "phoneCall", "mailOpen"],
  media: ["play", "pause", "skipBack", "skipForward", "volume", "mute", "music", "video", "image", "camera", "mic", "headphones"],
  emotions: ["smile", "frown", "meh", "laugh", "angry"],
  feedback: ["thumbsUp", "thumbsDown", "success", "error", "warning", "info", "heart", "star", "bookmark"],
  data: ["chart", "pieChart", "trendingUp", "trendingDown", "activity", "database", "barChart", "lineChart"],
  status: ["loader", "refresh", "lock", "unlock", "eye", "eyeOff", "shield", "battery", "wifi"],
  weather: ["sun", "moon", "cloud", "rain", "cloudSnow", "cloudLightning", "wind", "thermometer"],
  finance: ["creditCard", "dollarSign", "euro", "poundSterling", "bitcoin", "shoppingCart", "wallet", "calculator"],
  business: ["briefcase", "building", "users", "userPlus", "userCheck", "userCog"],
  files: ["fileText", "fileImage", "fileVideo", "folder", "fileCheck", "bookOpen"],
  social: ["facebook", "twitter", "instagram", "linkedin", "youtube", "github", "slack", "figma", "chrome", "codepen", "codesandbox"],
  mobile: ["smartphone", "tablet", "monitor", "laptop", "bluetooth", "signal", "maximize"],
  editing: ["type", "bold", "italic", "underline", "alignLeft", "alignCenter", "list", "listOrdered", "palette", "layers", "square"],
  time: ["clock", "timer", "calendar", "calendarDays", "calendarCheck", "calendarClock"]
};
var emotionIcons = {
  happy: "smile",
  sad: "frown",
  neutral: "meh",
  excited: "laugh",
  angry: "angry",
  love: "heart",
  like: "thumbsUp",
  dislike: "thumbsDown"
};
var statusIcons = {
  loading: "loader",
  success: "success",
  error: "error",
  warning: "warning",
  info: "info",
  locked: "lock",
  unlocked: "unlock",
  visible: "eye",
  hidden: "eyeOff"
};
var PhosphorIcons = null;
var PROJECT_ICONS = {
  // Navigation & Layout
  "layout-dashboard": { lucide: "LayoutDashboard", phosphor: "SquaresFour", untitled: "layout-dashboard" },
  "folder": { lucide: "Folder", phosphor: "Folder", untitled: "folder" },
  "alert-circle": { lucide: "AlertCircle", phosphor: "WarningCircle", untitled: "alert-circle" },
  "alertCircle": { lucide: "AlertCircle", phosphor: "WarningCircle", untitled: "alert-circle" },
  "columns": { lucide: "Columns", phosphor: "Columns", untitled: "columns" },
  "users": { lucide: "Users", phosphor: "Users", untitled: "users" },
  "settings": { lucide: "Settings", phosphor: "Gear", untitled: "settings" },
  "menu": { lucide: "Menu", phosphor: "List", untitled: "menu" },
  "close": { lucide: "X", phosphor: "X", untitled: "close" },
  "chevronLeft": { lucide: "ChevronLeft", phosphor: "CaretLeft", untitled: "chevron-left" },
  "chevronRight": { lucide: "ChevronRight", phosphor: "CaretRight", untitled: "chevron-right" },
  "chevronDown": { lucide: "ChevronDown", phosphor: "CaretDown", untitled: "chevron-down" },
  "chevronUp": { lucide: "ChevronUp", phosphor: "CaretUp", untitled: "chevron-up" },
  // Actions
  "add": { lucide: "Plus", phosphor: "Plus", untitled: "add" },
  "edit": { lucide: "Edit", phosphor: "Pencil", untitled: "edit" },
  "pencil": { lucide: "Pencil", phosphor: "Pencil", untitled: "pencil" },
  "trash": { lucide: "Trash2", phosphor: "Trash", untitled: "trash" },
  "upload": { lucide: "Upload", phosphor: "Upload", untitled: "upload" },
  "x": { lucide: "X", phosphor: "X", untitled: "close" },
  "check": { lucide: "Check", phosphor: "Check", untitled: "check" },
  "search": { lucide: "Search", phosphor: "MagnifyingGlass", untitled: "search" },
  // Status & Feedback
  "loader": { lucide: "Loader2", phosphor: "Spinner", untitled: "loader" },
  "loader2": { lucide: "Loader2", phosphor: "Spinner", untitled: "loader" },
  "check-circle": { lucide: "CheckCircle", phosphor: "CheckCircle", untitled: "check-circle" },
  "checkCircle": { lucide: "CheckCircle", phosphor: "CheckCircle", untitled: "check-circle" },
  "refresh": { lucide: "RefreshCw", phosphor: "ArrowClockwise", untitled: "refresh" },
  "refreshCw": { lucide: "RefreshCw", phosphor: "ArrowClockwise", untitled: "refresh" },
  "bell": { lucide: "Bell", phosphor: "Bell", untitled: "bell" },
  // User & Auth
  "user": { lucide: "User", phosphor: "User", untitled: "user" },
  "userPlus": { lucide: "UserPlus", phosphor: "UserPlus", untitled: "user-plus" },
  "logOut": { lucide: "LogOut", phosphor: "SignOut", untitled: "log-out" },
  "chrome": { lucide: "Chrome", phosphor: "ChromeLogo", untitled: "chrome" },
  "github": { lucide: "Github", phosphor: "GithubLogo", untitled: "github" },
  "message": { lucide: "MessageCircle", phosphor: "ChatCircle", untitled: "message" },
  // Content
  "messageSquare": { lucide: "MessageSquare", phosphor: "ChatSquare", untitled: "message-square" },
  "message-square": { lucide: "MessageSquare", phosphor: "ChatSquare", untitled: "message-square" },
  "inbox": { lucide: "Inbox", phosphor: "Inbox", untitled: "inbox" },
  "star": { lucide: "Star", phosphor: "Star", untitled: "star" },
  "calendar": { lucide: "Calendar", phosphor: "Calendar", untitled: "calendar" },
  "checkSquare": { lucide: "CheckSquare", phosphor: "CheckSquare", untitled: "check-square" },
  "clock": { lucide: "Clock", phosphor: "Clock", untitled: "clock" },
  // Theme & UI
  "monitor": { lucide: "Monitor", phosphor: "Monitor", untitled: "monitor" },
  "sun": { lucide: "Sun", phosphor: "Sun", untitled: "sun" },
  "moon": { lucide: "Moon", phosphor: "Moon", untitled: "moon" },
  // AI & Features
  "sparkles": { lucide: "Sparkles", phosphor: "Sparkle", untitled: "sparkles" },
  "lightbulb": { lucide: "Lightbulb", phosphor: "Lightbulb", untitled: "lightbulb" },
  // Priority
  "arrowUp": { lucide: "ArrowUp", phosphor: "ArrowUp", untitled: "arrow-up" },
  "arrowDown": { lucide: "ArrowDown", phosphor: "ArrowDown", untitled: "arrow-down" },
  "remove": { lucide: "Minus", phosphor: "Minus", untitled: "remove" },
  // Eye (password)
  "eye": { lucide: "Eye", phosphor: "Eye", untitled: "eye" },
  "eyeOff": { lucide: "EyeOff", phosphor: "EyeSlash", untitled: "eye-off" }
};
async function initPhosphorIcons() {
  if (typeof window === "undefined") return null;
  if (!PhosphorIcons) {
    try {
      const phosphorModule = await import('@phosphor-icons/react');
      PhosphorIcons = phosphorModule;
    } catch (error) {
      console.warn("Phosphor Icons not available. Install @phosphor-icons/react to use.");
      return null;
    }
  }
  return PhosphorIcons;
}
function getIconFromProvider(iconName, provider = "lucide") {
  const iconMapping = PROJECT_ICONS[iconName];
  if (!iconMapping) {
    return getIconDirect(iconName, provider);
  }
  const mappedName = iconMapping[provider];
  switch (provider) {
    case "lucide":
      return LucideIcons[mappedName] || null;
    case "phosphor":
      if (!PhosphorIcons) {
        return null;
      }
      return (PhosphorIcons == null ? void 0 : PhosphorIcons[mappedName]) || null;
    case "untitled":
      return null;
    default:
      return null;
  }
}
function getIconDirect(iconName, provider) {
  switch (provider) {
    case "lucide":
      const lucideName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
      return LucideIcons[iconName] || LucideIcons[lucideName] || null;
    case "phosphor":
      if (!PhosphorIcons) {
        return null;
      }
      const phosphorName1 = iconName.charAt(0).toUpperCase() + iconName.slice(1);
      const phosphorName2 = iconName.split(/(?=[A-Z])/).map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("");
      return (PhosphorIcons == null ? void 0 : PhosphorIcons[phosphorName1]) || (PhosphorIcons == null ? void 0 : PhosphorIcons[phosphorName2]) || (PhosphorIcons == null ? void 0 : PhosphorIcons[iconName]) || null;
    case "untitled":
      return null;
    default:
      return null;
  }
}
function getIconNameForProvider(iconName, provider) {
  const iconMapping = PROJECT_ICONS[iconName];
  if (iconMapping && iconMapping[provider]) {
    return iconMapping[provider];
  }
  return iconName;
}
var Icon = React61__default.forwardRef(({
  name,
  size = 24,
  className,
  emotion,
  status,
  animated = false,
  pulse = false,
  spin = false,
  bounce = false,
  variant = "default",
  provider = "lucide"
}, ref) => {
  const [isClient, setIsClient] = React61__default.useState(false);
  const [phosphorLoaded, setPhosphorLoaded] = React61__default.useState(false);
  React61__default.useEffect(() => {
    setIsClient(true);
    if (provider === "phosphor") {
      initPhosphorIcons().then(() => setPhosphorLoaded(true));
    } else {
      setPhosphorLoaded(true);
    }
  }, [provider]);
  const iconName = emotion ? emotionIcons[emotion] : status ? statusIcons[status] : name;
  let IconComponent = null;
  if (provider === "lucide") {
    IconComponent = icons[iconName];
  } else if (provider === "phosphor") {
    if (phosphorLoaded) {
      IconComponent = getIconFromProvider(iconName, "phosphor");
    }
  } else if (provider === "untitled") {
    IconComponent = icons[iconName];
  }
  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found in provider "${provider}"`);
    return /* @__PURE__ */ jsx("span", { style: { width: size, height: size }, className });
  }
  if (!isClient || provider === "phosphor" && !phosphorLoaded) {
    return /* @__PURE__ */ jsx("span", { style: { width: size, height: size }, className });
  }
  const animationClasses = cn({
    "animate-pulse": pulse,
    "animate-spin": spin,
    "animate-bounce": bounce,
    "transition-all duration-200 ease-in-out": animated
  });
  const variantClasses = cn({
    "text-gray-900 dark:text-white": variant === "default",
    "text-blue-600 dark:text-blue-400": variant === "primary",
    "text-gray-600 dark:text-gray-400": variant === "secondary",
    "text-green-600 dark:text-green-400": variant === "success",
    "text-yellow-600 dark:text-yellow-400": variant === "warning",
    "text-red-600 dark:text-red-400": variant === "error",
    "text-gray-500 dark:text-gray-500": variant === "muted"
  });
  const iconSize = typeof size === "number" ? size : parseInt(size) || 24;
  const iconProps = provider === "phosphor" ? { size: iconSize, weight: "regular", className: cn(variantClasses, className) } : { size: iconSize, className: cn(variantClasses, className) };
  return /* @__PURE__ */ jsx(
    "span",
    {
      ref,
      className: cn(
        "inline-flex items-center justify-center",
        animationClasses,
        className
      ),
      style: { width: size, height: size },
      children: IconComponent && React61__default.createElement(IconComponent, iconProps)
    }
  );
});
Icon.displayName = "Icon";
var EmotionIcon = React61__default.forwardRef(
  (props, ref) => /* @__PURE__ */ jsx(Icon, { ref, name: "smile", ...props })
);
EmotionIcon.displayName = "EmotionIcon";
var StatusIcon = React61__default.forwardRef(
  (props, ref) => /* @__PURE__ */ jsx(Icon, { ref, name: "info", ...props })
);
StatusIcon.displayName = "StatusIcon";
var LoadingIcon = React61__default.forwardRef(
  (props, ref) => /* @__PURE__ */ jsx(Icon, { ref, name: "loader", status: "loading", spin: true, ...props })
);
LoadingIcon.displayName = "LoadingIcon";
var SuccessIcon = React61__default.forwardRef(
  (props, ref) => /* @__PURE__ */ jsx(Icon, { ref, name: "check", status: "success", variant: "success", ...props })
);
SuccessIcon.displayName = "SuccessIcon";
var ErrorIcon = React61__default.forwardRef(
  (props, ref) => /* @__PURE__ */ jsx(Icon, { ref, name: "alertCircle", status: "error", variant: "error", ...props })
);
ErrorIcon.displayName = "ErrorIcon";
var Avatar = React61.forwardRef(
  ({ className, size = "md", variant = "default", src, alt, children, ...props }, ref) => {
    const sizeClasses2 = {
      sm: "w-8 h-8",
      md: "w-10 h-10",
      lg: "w-12 h-12"
    };
    const variantClasses = {
      default: "",
      glass: "ring-2 ring-white/30 backdrop-blur-sm"
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          "relative flex shrink-0 overflow-hidden rounded-full",
          sizeClasses2[size],
          variantClasses[variant],
          className
        ),
        ...props,
        children: src ? /* @__PURE__ */ jsx(AvatarImage, { src, alt: alt || "avatar" }) : /* @__PURE__ */ jsx(AvatarFallback, { children: children || (alt ? alt.charAt(0).toUpperCase() : "U") })
      }
    );
  }
);
Avatar.displayName = "Avatar";
var AvatarImage = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "img",
    {
      ref,
      className: cn("aspect-square h-full w-full", className),
      ...props
    }
  )
);
AvatarImage.displayName = "AvatarImage";
var AvatarFallback = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn(
        "flex h-full w-full items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-medium",
        className
      ),
      ...props
    }
  )
);
AvatarFallback.displayName = "AvatarFallback";
function Modal({
  className,
  isOpen,
  onClose,
  children,
  size = "md",
  showCloseButton = true,
  closeOnOverlayClick = true,
  title,
  description,
  showBackdrop = true,
  centered = true
}) {
  const modalRef = React61.useRef(null);
  React61.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);
  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };
  const sizeClasses2 = {
    sm: "md:w-80",
    // 20rem = 320px
    md: "md:w-96",
    // 24rem = 384px
    lg: "md:w-[32rem]",
    // 32rem = 512px
    xl: "md:w-[38rem]",
    // 38rem = 608px
    "2xl": "md:w-[50rem]"
    // 50rem = 800px
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center p-4 overflow-hidden",
        // PWA 호환성 개선
        centered ? "items-center" : "items-start pt-16",
        // 64px 상단 여백
        className
      ),
      style: {
        width: "100vw",
        height: "100vh",
        minHeight: "100vh"
      },
      onClick: handleOverlayClick,
      children: [
        showBackdrop && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300" }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            ref: modalRef,
            className: cn(
              "relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 transform transition-all duration-300 ease-out overflow-hidden",
              // 반응형: 모바일 전체, 데스크톱 고정
              "w-[calc(100vw-2rem)]",
              // 모바일: 화면 너비 - 패딩
              sizeClasses2[size],
              // 데스크톱: md:w-[50rem]
              "max-w-[calc(100vw-2rem)]",
              // 최대 너비 제한
              "flex-none"
              // flex 컨테이너에서 크기 유지
            ),
            style: {
              animation: "modalSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              maxHeight: "90vh",
              marginTop: centered ? "auto" : "0",
              marginBottom: centered ? "auto" : "0"
            },
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" }),
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-400/10 to-transparent rounded-full -translate-y-16 translate-x-16" }),
              /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/10 to-transparent rounded-full translate-y-12 -translate-x-12" }),
              title && /* @__PURE__ */ jsxs("div", { className: "relative z-10 px-6 pt-6 pb-4 border-b border-gray-200/50 dark:border-gray-700/50", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 mb-2", children: [
                  /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 dark:text-white flex-1 min-w-0", children: title }),
                  showCloseButton && /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: onClose,
                      className: "flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-110 z-20",
                      "aria-label": "\uB2EB\uAE30",
                      children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
                    }
                  )
                ] }),
                description && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: description })
              ] }),
              !title && showCloseButton && /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: onClose,
                  className: "absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-110 z-20",
                  "aria-label": "\uB2EB\uAE30",
                  children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
                }
              ),
              /* @__PURE__ */ jsx("div", { className: `relative z-10 ${title ? "px-6 mb-6" : "p-6"}`, children })
            ]
          }
        )
      ]
    }
  );
}
var FeatureCard = React61__default.forwardRef(
  ({
    className,
    icon,
    title,
    description,
    variant = "default",
    size = "md",
    hover = "scale",
    gradient = "blue",
    customGradient,
    ...props
  }, ref) => {
    const sizeClasses2 = {
      sm: "p-4",
      md: "p-6",
      lg: "p-8"
    };
    const variantClasses = {
      default: "bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50",
      gradient: `bg-gradient-to-br ${customGradient || getGradientClass2(gradient)}`,
      glass: "bg-white/10 dark:bg-gray-800/10 backdrop-blur-md border border-white/20 dark:border-gray-700/20",
      neon: "bg-gray-900/90 dark:bg-gray-900/90 border border-cyan-400/30 dark:border-cyan-400/30 shadow-lg shadow-cyan-400/20"
    };
    const hoverClasses = {
      scale: "hover:scale-105 transition-transform duration-300",
      glow: "hover:shadow-2xl hover:shadow-blue-500/25 dark:hover:shadow-cyan-400/25 transition-shadow duration-300",
      slide: "hover:-translate-y-2 transition-transform duration-300",
      none: ""
    };
    const iconSize = size === "lg" ? "text-5xl" : size === "md" ? "text-4xl" : "text-3xl";
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: merge(
          "rounded-2xl shadow-lg transition-all duration-300 flex flex-col items-center text-center",
          sizeClasses2[size],
          variantClasses[variant],
          hoverClasses[hover],
          className
        ),
        ...props,
        children: [
          icon && /* @__PURE__ */ jsx("div", { className: `mb-4 ${iconSize} ${variant === "neon" ? "text-cyan-400" : ""}`, children: typeof icon === "string" && icon.startsWith("http") ? /* @__PURE__ */ jsx("img", { src: icon, alt: title, className: "w-full h-full object-contain" }) : typeof icon === "string" ? /* @__PURE__ */ jsx("span", { children: icon }) : /* @__PURE__ */ jsx(Icon, { name: icon, className: "w-full h-full" }) }),
          /* @__PURE__ */ jsx("h3", { className: merge(
            "font-bold mb-2",
            size === "lg" ? "text-2xl" : size === "md" ? "text-xl" : "text-lg",
            variant === "gradient" ? "text-white" : "text-gray-900 dark:text-white"
          ), children: title }),
          /* @__PURE__ */ jsx("p", { className: merge(
            size === "lg" ? "text-base" : "text-sm",
            variant === "gradient" ? "text-white/90" : "text-gray-600 dark:text-gray-300"
          ), children: description })
        ]
      }
    );
  }
);
FeatureCard.displayName = "FeatureCard";
function getGradientClass2(gradient) {
  const gradients = {
    blue: "from-blue-500 via-cyan-500 to-blue-600",
    purple: "from-purple-500 via-pink-500 to-purple-600",
    green: "from-green-500 via-emerald-500 to-green-600",
    orange: "from-orange-500 via-red-500 to-orange-600",
    pink: "from-pink-500 via-rose-500 to-pink-600"
  };
  return gradients[gradient] || gradients.blue;
}
var toneClasses = {
  blue: {
    container: "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700",
    icon: "h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0",
    title: "text-sm font-medium text-blue-900 dark:text-blue-100 mb-2 block",
    body: "text-gray-800 dark:text-gray-200 text-sm leading-relaxed"
  },
  purple: {
    container: "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-700",
    icon: "h-5 w-5 text-purple-600 dark:text-purple-400 mr-3 mt-0.5 flex-shrink-0",
    title: "text-sm font-medium text-purple-900 dark:text-purple-100 mb-2 block",
    body: "text-gray-800 dark:text-gray-200 text-sm leading-relaxed"
  },
  green: {
    container: "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 border border-green-200 dark:border-green-700",
    icon: "h-5 w-5 text-green-600 dark:text-green-400 mr-3 mt-0.5 flex-shrink-0",
    title: "text-sm font-medium text-green-900 dark:text-green-100 mb-2 block",
    body: "text-gray-800 dark:text-gray-200 text-sm leading-relaxed"
  },
  orange: {
    container: "bg-gradient-to-r from-orange-50 to-rose-50 dark:from-orange-900/20 dark:to-rose-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-700",
    icon: "h-5 w-5 text-orange-600 dark:text-orange-400 mr-3 mt-0.5 flex-shrink-0",
    title: "text-sm font-medium text-orange-900 dark:text-orange-100 mb-2 block",
    body: "text-gray-800 dark:text-gray-200 text-sm leading-relaxed"
  }
};
var InfoCard = React61__default.forwardRef(({ className, title, icon, tone = "blue", children, ...props }, ref) => {
  const t = toneClasses[tone];
  return /* @__PURE__ */ jsx("div", { ref, className: merge(t.container, className), ...props, children: /* @__PURE__ */ jsxs("div", { className: "flex items-start mb-2", children: [
    /* @__PURE__ */ jsx(Icon, { name: icon, className: t.icon }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsx("span", { className: t.title, children: title }),
      /* @__PURE__ */ jsx("div", { className: t.body, children })
    ] })
  ] }) });
});
InfoCard.displayName = "InfoCard";
var HeroSection = React61__default.forwardRef(
  ({
    className,
    title,
    subtitle,
    description,
    primaryAction,
    secondaryAction,
    variant = "default",
    background = "gradient",
    customBackground,
    size = "lg",
    ...props
  }, ref) => {
    const sizeClasses2 = {
      sm: "py-16",
      md: "py-20",
      lg: "py-24",
      xl: "py-32"
    };
    const titleSizeClasses = {
      sm: "text-3xl md:text-4xl",
      md: "text-4xl md:text-5xl",
      lg: "text-5xl md:text-6xl",
      xl: "text-6xl md:text-7xl"
    };
    const subtitleSizeClasses = {
      sm: "text-lg md:text-xl",
      md: "text-xl md:text-2xl",
      lg: "text-2xl md:text-3xl",
      xl: "text-3xl md:text-4xl"
    };
    const descriptionSizeClasses = {
      sm: "text-base md:text-lg",
      md: "text-lg md:text-xl",
      lg: "text-lg md:text-2xl",
      xl: "text-xl md:text-3xl"
    };
    const backgroundClasses = {
      none: "",
      gradient: "relative overflow-hidden",
      particles: "relative overflow-hidden",
      video: "relative overflow-hidden"
    };
    const backgroundContent = {
      none: null,
      gradient: /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0 pointer-events-none", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -top-32 -left-32 w-[600px] h-[600px] bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 opacity-60 rounded-full blur-3xl animate-pulse" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tr from-orange-400 via-pink-500 to-red-600 opacity-40 rounded-full blur-2xl animate-pulse" })
      ] }),
      particles: /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0 pointer-events-none", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-30", children: [...Array(20)].map((_, i) => /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute w-2 h-2 bg-blue-500 rounded-full animate-pulse",
            style: {
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }
          },
          i
        )) })
      ] }),
      video: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-0 pointer-events-none", children: /* @__PURE__ */ jsx(
        "video",
        {
          autoPlay: true,
          loop: true,
          muted: true,
          playsInline: true,
          className: "absolute inset-0 w-full h-full object-cover opacity-20",
          children: /* @__PURE__ */ jsx("source", { src: customBackground, type: "video/mp4" })
        }
      ) })
    };
    return /* @__PURE__ */ jsxs(
      "section",
      {
        ref,
        className: merge(
          "flex-1 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8",
          sizeClasses2[size],
          backgroundClasses[background],
          className
        ),
        ...props,
        children: [
          backgroundContent[background],
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-4xl mx-auto", children: [
            /* @__PURE__ */ jsxs("h1", { className: merge(
              "font-extrabold mb-6 text-gray-900 dark:text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_4px_24px_rgba(0,0,0,0.25)]",
              titleSizeClasses[size]
            ), children: [
              /* @__PURE__ */ jsx("span", { className: "block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-cyan-300 dark:via-blue-400 dark:to-purple-400 drop-shadow-[0_2px_8px_rgba(39,94,254,0.3)]", children: title }),
              subtitle && /* @__PURE__ */ jsx("span", { className: merge(
                "block font-semibold mt-4 text-gray-700 dark:text-white/90",
                subtitleSizeClasses[size]
              ), children: subtitle })
            ] }),
            /* @__PURE__ */ jsx("p", { className: merge(
              "text-gray-600 dark:text-white/80 mb-10 max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.05)] dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]",
              descriptionSizeClasses[size]
            ), children: description }),
            (primaryAction || secondaryAction) && /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center mb-8", children: [
              primaryAction && /* @__PURE__ */ jsxs(
                Button,
                {
                  href: primaryAction.href,
                  variant: "gradient",
                  size: size === "xl" ? "lg" : "md",
                  className: "inline-flex items-center",
                  children: [
                    primaryAction.icon && /* @__PURE__ */ jsx("span", { className: "mr-2", children: primaryAction.icon }),
                    primaryAction.label
                  ]
                }
              ),
              secondaryAction && /* @__PURE__ */ jsxs(
                Button,
                {
                  href: secondaryAction.href,
                  variant: "outline",
                  size: size === "xl" ? "lg" : "md",
                  className: "inline-flex items-center",
                  children: [
                    secondaryAction.icon && /* @__PURE__ */ jsx("span", { className: "mr-2", children: secondaryAction.icon }),
                    secondaryAction.label
                  ]
                }
              )
            ] })
          ] })
        ]
      }
    );
  }
);
HeroSection.displayName = "HeroSection";
var Container = React61__default.forwardRef(
  ({
    className,
    size = "lg",
    padding = "md",
    centered = true,
    fluid = false,
    ...props
  }, ref) => {
    const sizeClasses2 = {
      sm: "max-w-2xl",
      // 672px
      md: "max-w-4xl",
      // 896px
      lg: "max-w-6xl",
      // 1152px
      xl: "max-w-7xl",
      // 1280px
      full: "max-w-full"
    };
    const paddingClasses = {
      none: "",
      sm: "px-4 py-8",
      // 16px 좌우, 32px 상하
      md: "px-6 py-12",
      // 24px 좌우, 48px 상하
      lg: "px-8 py-16",
      // 32px 좌우, 64px 상하
      xl: "px-12 py-20"
      // 48px 좌우, 80px 상하
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          "w-full",
          !fluid && sizeClasses2[size],
          paddingClasses[padding],
          centered && "mx-auto",
          "bg-white/5 backdrop-blur-sm rounded-xl shadow-xl",
          "dark:bg-slate-900/5",
          className
        ),
        ...props
      }
    );
  }
);
Container.displayName = "Container";
var Grid = React61.forwardRef(
  ({
    className,
    cols = 1,
    gap = "md",
    gapX,
    gapY,
    responsive = true,
    ...props
  }, ref) => {
    const colsClasses = {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5",
      6: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-6",
      7: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-7",
      8: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-8",
      9: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-9",
      10: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-10",
      11: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-11",
      12: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-12"
    };
    const gapClasses = {
      none: "gap-0",
      sm: "gap-4",
      // 16px
      md: "gap-6",
      // 24px
      lg: "gap-8",
      // 32px
      xl: "gap-12"
      // 48px
    };
    const gapXClasses = {
      none: "gap-x-0",
      sm: "gap-x-4",
      // 16px
      md: "gap-x-6",
      // 24px
      lg: "gap-x-8",
      // 32px
      xl: "gap-x-12"
      // 48px
    };
    const gapYClasses = {
      none: "gap-y-0",
      sm: "gap-y-4",
      // 16px
      md: "gap-y-6",
      // 24px
      lg: "gap-y-8",
      // 32px
      xl: "gap-y-12"
      // 48px
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          "grid",
          responsive ? colsClasses[cols] : `grid-cols-${cols}`,
          gapX ? gapXClasses[gapX] : gapClasses[gap],
          gapY && gapYClasses[gapY],
          className
        ),
        ...props
      }
    );
  }
);
Grid.displayName = "Grid";
var Stack = React61.forwardRef(
  ({
    className,
    direction = "vertical",
    spacing = "md",
    align = "start",
    justify = "start",
    wrap = false,
    ...props
  }, ref) => {
    const directionClasses = {
      vertical: "flex flex-col",
      horizontal: "flex flex-row"
    };
    const spacingClasses = {
      none: "",
      sm: direction === "vertical" ? "space-y-4" : "space-x-4",
      // 16px
      md: direction === "vertical" ? "space-y-6" : "space-x-6",
      // 24px
      lg: direction === "vertical" ? "space-y-8" : "space-x-8",
      // 32px
      xl: direction === "vertical" ? "space-y-12" : "space-x-12"
      // 48px
    };
    const alignClasses = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch"
    };
    const justifyClasses = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly"
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          directionClasses[direction],
          spacingClasses[spacing],
          alignClasses[align],
          justifyClasses[justify],
          wrap && "flex-wrap",
          className
        ),
        ...props
      }
    );
  }
);
Stack.displayName = "Stack";
var Divider = React61.forwardRef(
  ({
    className,
    orientation = "horizontal",
    variant = "solid",
    size = "md",
    spacing = "md",
    color = "default",
    ...props
  }, ref) => {
    const orientationClasses = {
      horizontal: "w-full",
      vertical: "h-full w-px"
    };
    const sizeClasses2 = {
      sm: orientation === "horizontal" ? "h-px" : "w-px",
      md: orientation === "horizontal" ? "h-0.5" : "w-0.5",
      // 2px
      lg: orientation === "horizontal" ? "h-1" : "w-1"
      // 4px
    };
    const variantClasses = {
      solid: "",
      dashed: "border-dashed",
      dotted: "border-dotted",
      gradient: orientation === "horizontal" ? "bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600" : "bg-gradient-to-b from-transparent via-gray-300 to-transparent dark:via-gray-600",
      glass: orientation === "horizontal" ? "bg-gradient-to-r from-transparent via-white/30 to-transparent" : "bg-gradient-to-b from-transparent via-white/30 to-transparent"
    };
    const colorClasses5 = {
      default: "bg-gray-200 dark:bg-gray-700",
      muted: "bg-gray-100 dark:bg-gray-800",
      primary: "bg-blue-200 dark:bg-blue-700",
      secondary: "bg-gray-300 dark:bg-gray-600"
    };
    const spacingClasses = {
      none: "",
      sm: orientation === "horizontal" ? "my-4" : "mx-4",
      // 16px
      md: orientation === "horizontal" ? "my-6" : "mx-6",
      // 24px
      lg: orientation === "horizontal" ? "my-8" : "mx-8",
      // 32px
      xl: orientation === "horizontal" ? "my-12" : "mx-12"
      // 48px
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          "flex-shrink-0",
          orientationClasses[orientation],
          sizeClasses2[size],
          variant === "gradient" ? variantClasses[variant] : colorClasses5[color],
          variant !== "gradient" && variantClasses[variant],
          spacingClasses[spacing],
          className
        ),
        ...props
      }
    );
  }
);
Divider.displayName = "Divider";
var Card = React61__default.forwardRef(
  ({ className, variant = "default", ...props }, ref) => {
    const variantClasses = {
      default: "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700",
      outline: "bg-transparent border-2 border-slate-300 dark:border-slate-600",
      elevated: "bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700"
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: merge(
          "rounded-lg p-6",
          variantClasses[variant],
          className
        ),
        ...props
      }
    );
  }
);
Card.displayName = "Card";
var CardHeader = React61__default.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: merge("flex flex-col space-y-1.5 p-6", className),
      ...props
    }
  )
);
CardHeader.displayName = "CardHeader";
var CardTitle = React61__default.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "h3",
    {
      ref,
      className: merge(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      ),
      ...props
    }
  )
);
CardTitle.displayName = "CardTitle";
var CardDescription = React61__default.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "p",
    {
      ref,
      className: merge("text-sm text-slate-500 dark:text-slate-400", className),
      ...props
    }
  )
);
CardDescription.displayName = "CardDescription";
var CardContent = React61__default.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: merge("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
var CardFooter = React61__default.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: merge("flex items-center p-6 pt-0", className),
      ...props
    }
  )
);
CardFooter.displayName = "CardFooter";
var Panel = React61__default.forwardRef(
  ({
    className,
    style = "default",
    effect = "none",
    transparency = 1,
    blurIntensity = 0,
    borderOpacity = 1,
    shadowOpacity = 1,
    glowIntensity = 0,
    glowColor = "blue",
    particleEffect = false,
    hoverEffect = false,
    animationEffect = false,
    padding = "md",
    customPadding,
    rounded = "lg",
    customRounded,
    background = "solid",
    gradientColors = ["#3B82F6", "#8B5CF6"],
    patternType = "dots",
    backgroundImage,
    backgroundVideo,
    interactive = false,
    hoverScale = 1.05,
    hoverRotate = 0,
    hoverGlow = false,
    children,
    ...cardProps
  }, ref) => {
    const styleClasses = React61__default.useMemo(() => {
      const baseClasses = "transition-all duration-300";
      switch (style) {
        case "glass":
          return merge(baseClasses, "bg-white/10 backdrop-blur-md border border-white/20");
        case "neon":
          return merge(baseClasses, "bg-gray-900 border border-cyan-400/30 shadow-lg shadow-cyan-400/20");
        case "holographic":
          return merge(baseClasses, "bg-gradient-to-br from-white/20 via-purple-500/20 to-cyan-500/20 backdrop-blur-sm border border-white/30");
        case "cyberpunk":
          return merge(baseClasses, "bg-gray-900 border-2 border-pink-500 shadow-lg shadow-pink-500/30");
        case "minimal":
          return merge(baseClasses, "bg-white border border-gray-200 shadow-sm");
        case "luxury":
          return merge(baseClasses, "bg-gradient-to-br from-amber-50 to-yellow-100 border border-amber-200 shadow-xl");
        default:
          return merge(baseClasses, "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700");
      }
    }, [style]);
    const effectClasses = React61__default.useMemo(() => {
      switch (effect) {
        case "glow":
          return "shadow-2xl shadow-blue-500/20 dark:shadow-cyan-400/20";
        case "shadow":
          return "shadow-xl";
        case "gradient":
          return "bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10";
        case "animated":
          return "animate-pulse";
        default:
          return "";
      }
    }, [effect]);
    const paddingClasses = React61__default.useMemo(() => {
      if (customPadding) return customPadding;
      switch (padding) {
        case "none":
          return "p-0";
        case "sm":
          return "p-3";
        case "md":
          return "p-6";
        case "lg":
          return "p-8";
        case "xl":
          return "p-12";
        default:
          return "p-6";
      }
    }, [padding, customPadding]);
    const roundedClasses = React61__default.useMemo(() => {
      if (customRounded) return customRounded;
      switch (rounded) {
        case "none":
          return "rounded-none";
        case "sm":
          return "rounded-sm";
        case "md":
          return "rounded-md";
        case "lg":
          return "rounded-lg";
        case "xl":
          return "rounded-xl";
        case "full":
          return "rounded-full";
        default:
          return "rounded-lg";
      }
    }, [rounded, customRounded]);
    const patternBackground = React61__default.useMemo(() => {
      switch (patternType) {
        case "dots":
          return "radial-gradient(circle, #000 1px, transparent 1px)";
        case "lines":
          return "linear-gradient(45deg, #000 1px, transparent 1px)";
        case "grid":
          return "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)";
        case "waves":
          return "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)";
        default:
          return "";
      }
    }, [patternType]);
    const backgroundStyles = React61__default.useMemo(() => {
      const styles = {
        opacity: transparency
      };
      if (blurIntensity > 0) {
        styles.backdropFilter = `blur(${blurIntensity}px)`;
      }
      if (borderOpacity < 1) {
        styles.borderColor = `rgba(0, 0, 0, ${borderOpacity})`;
      }
      if (shadowOpacity < 1) {
        styles.boxShadow = `0 4px 6px -1px rgba(0, 0, 0, ${shadowOpacity * 0.1})`;
      }
      if (glowIntensity > 0) {
        styles.boxShadow = `${styles.boxShadow || ""}, 0 0 ${glowIntensity * 10}px ${glowColor}`;
      }
      switch (background) {
        case "gradient":
          styles.background = `linear-gradient(135deg, ${gradientColors.join(", ")})`;
          break;
        case "pattern":
          styles.backgroundImage = patternBackground;
          break;
        case "image":
          if (backgroundImage) {
            styles.backgroundImage = `url(${backgroundImage})`;
            styles.backgroundSize = "cover";
            styles.backgroundPosition = "center";
          }
          break;
      }
      return styles;
    }, [transparency, blurIntensity, borderOpacity, shadowOpacity, glowIntensity, glowColor, background, gradientColors, patternBackground, backgroundImage]);
    const hoverClasses = React61__default.useMemo(() => {
      if (!interactive) return "";
      const classes = [];
      if (hoverScale !== 1) {
        classes.push(`hover:scale-${hoverScale}`);
      }
      if (hoverRotate !== 0) {
        classes.push(`hover:rotate-${hoverRotate}`);
      }
      if (hoverGlow) {
        classes.push("hover:shadow-2xl hover:shadow-blue-500/30");
      }
      return classes.join(" ");
    }, [interactive, hoverScale, hoverRotate, hoverGlow]);
    const panelClasses = React61__default.useMemo(() => merge(
      "panel-component",
      `panel-${style}`,
      `panel-effect-${effect}`,
      styleClasses,
      effectClasses,
      paddingClasses,
      roundedClasses,
      hoverClasses,
      className
    ), [style, effect, styleClasses, effectClasses, paddingClasses, roundedClasses, hoverClasses, className]);
    return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      background === "video" && backgroundVideo && /* @__PURE__ */ jsx(
        "video",
        {
          className: "absolute inset-0 w-full h-full object-cover rounded-lg",
          autoPlay: true,
          muted: true,
          loop: true,
          playsInline: true,
          children: /* @__PURE__ */ jsx("source", { src: backgroundVideo, type: "video/mp4" })
        }
      ),
      particleEffect && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 pointer-events-none" }),
      /* @__PURE__ */ jsx(
        Card,
        {
          ref,
          className: panelClasses,
          style: backgroundStyles,
          ...cardProps,
          children
        }
      ),
      animationEffect && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 pointer-events-none" })
    ] });
  }
);
Panel.displayName = "Panel";
var colorClasses = {
  blue: {
    default: "border-blue-200 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-900/10",
    gradient: "bg-gradient-to-br from-blue-500 to-blue-600 border-blue-400 dark:border-blue-500",
    outline: "border-2 border-blue-300 dark:border-blue-600 bg-transparent",
    elevated: "border-blue-200 dark:border-blue-700 bg-white dark:bg-gray-800 shadow-lg",
    icon: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    badge: "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
  },
  purple: {
    default: "border-purple-200 dark:border-purple-700 bg-purple-50/50 dark:bg-purple-900/10",
    gradient: "bg-gradient-to-br from-purple-500 to-purple-600 border-purple-400 dark:border-purple-500",
    outline: "border-2 border-purple-300 dark:border-purple-600 bg-transparent",
    elevated: "border-purple-200 dark:border-purple-700 bg-white dark:bg-gray-800 shadow-lg",
    icon: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    badge: "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
  },
  green: {
    default: "border-green-200 dark:border-green-700 bg-green-50/50 dark:bg-green-900/10",
    gradient: "bg-gradient-to-br from-green-500 to-green-600 border-green-400 dark:border-green-500",
    outline: "border-2 border-green-300 dark:border-green-600 bg-transparent",
    elevated: "border-green-200 dark:border-green-700 bg-white dark:bg-gray-800 shadow-lg",
    icon: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    badge: "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300"
  },
  orange: {
    default: "border-orange-200 dark:border-orange-700 bg-orange-50/50 dark:bg-orange-900/10",
    gradient: "bg-gradient-to-br from-orange-500 to-orange-600 border-orange-400 dark:border-orange-500",
    outline: "border-2 border-orange-300 dark:border-orange-600 bg-transparent",
    elevated: "border-orange-200 dark:border-orange-700 bg-white dark:bg-gray-800 shadow-lg",
    icon: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
    badge: "bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
  },
  red: {
    default: "border-red-200 dark:border-red-700 bg-red-50/50 dark:bg-red-900/10",
    gradient: "bg-gradient-to-br from-red-500 to-red-600 border-red-400 dark:border-red-500",
    outline: "border-2 border-red-300 dark:border-red-600 bg-transparent",
    elevated: "border-red-200 dark:border-red-700 bg-white dark:bg-gray-800 shadow-lg",
    icon: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
    badge: "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300"
  },
  indigo: {
    default: "border-indigo-200 dark:border-indigo-700 bg-indigo-50/50 dark:bg-indigo-900/10",
    gradient: "bg-gradient-to-br from-indigo-500 to-indigo-600 border-indigo-400 dark:border-indigo-500",
    outline: "border-2 border-indigo-300 dark:border-indigo-600 bg-transparent",
    elevated: "border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 shadow-lg",
    icon: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400",
    badge: "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
  },
  pink: {
    default: "border-pink-200 dark:border-pink-700 bg-pink-50/50 dark:bg-pink-900/10",
    gradient: "bg-gradient-to-br from-pink-500 to-pink-600 border-pink-400 dark:border-pink-500",
    outline: "border-2 border-pink-300 dark:border-pink-600 bg-transparent",
    elevated: "border-pink-200 dark:border-pink-700 bg-white dark:bg-gray-800 shadow-lg",
    icon: "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400",
    badge: "bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300"
  },
  gray: {
    default: "border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/10",
    gradient: "bg-gradient-to-br from-gray-500 to-gray-600 border-gray-400 dark:border-gray-500",
    outline: "border-2 border-gray-300 dark:border-gray-600 bg-transparent",
    elevated: "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg",
    icon: "bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400",
    badge: "bg-gray-50 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300"
  }
};
var StatCard = React61__default.forwardRef(
  ({
    title,
    value,
    description,
    icon,
    trend,
    variant = "elevated",
    color = "blue",
    loading = false,
    className,
    ...props
  }, ref) => {
    const isGradient = variant === "gradient";
    const isTextWhite = isGradient;
    const colors = colorClasses[color];
    const variantClasses = variant === "default" ? `rounded-2xl border ${colors.default}` : variant === "gradient" ? `rounded-2xl border text-white ${colors.gradient}` : variant === "outline" ? `rounded-2xl ${colors.outline}` : `rounded-3xl border ${colors.elevated}`;
    const iconClasses = isGradient ? "bg-white/20" : colors.icon;
    const badgeClasses = isGradient ? "bg-white/20 text-white" : colors.badge;
    const formatValue = (val) => {
      if (typeof val === "number") {
        return val.toLocaleString();
      }
      return val;
    };
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: merge(
          "p-6 transition-all duration-200 hover:shadow-xl",
          variantClasses,
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-4", children: [
            icon && /* @__PURE__ */ jsx("div", { className: merge(
              "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0",
              iconClasses
            ), children: typeof icon === "string" ? /* @__PURE__ */ jsx(
              Icon,
              {
                name: icon,
                className: merge(
                  "w-6 h-6",
                  isTextWhite ? "text-white" : ""
                )
              }
            ) : icon }),
            title && /* @__PURE__ */ jsx("span", { className: merge(
              "text-sm px-3 py-1 rounded-full font-medium",
              badgeClasses
            ), children: title })
          ] }),
          loading ? /* @__PURE__ */ jsx("div", { className: "h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" }) : /* @__PURE__ */ jsx("h3", { className: merge(
            "text-3xl font-bold mb-1",
            isTextWhite ? "text-white" : "text-gray-800 dark:text-white"
          ), children: formatValue(value) }),
          description && /* @__PURE__ */ jsx("p", { className: merge(
            "text-sm",
            isTextWhite ? "text-white/90" : "text-gray-600 dark:text-gray-300"
          ), children: description }),
          trend && !loading && /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxs(
              "span",
              {
                className: merge(
                  "text-xs font-medium",
                  trend.positive !== false ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                ),
                children: [
                  trend.positive !== false ? "\u2191" : "\u2193",
                  " ",
                  Math.abs(trend.value),
                  "%"
                ]
              }
            ),
            /* @__PURE__ */ jsx("span", { className: merge(
              "text-xs",
              isTextWhite ? "text-white/70" : "text-gray-500 dark:text-gray-400"
            ), children: trend.label })
          ] })
        ]
      }
    );
  }
);
StatCard.displayName = "StatCard";
var QuickActionCard = React61__default.forwardRef(
  ({
    title,
    description,
    icon,
    href,
    onClick,
    variant = "gradient",
    color = "blue",
    loading = false,
    className,
    ...props
  }, ref) => {
    const isGradient = variant === "gradient";
    const isTextWhite = isGradient || variant === "solid";
    const variantClasses = variant === "gradient" ? `text-white ${color === "blue" ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" : color === "purple" ? "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700" : color === "green" ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700" : color === "orange" ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700" : color === "red" ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700" : color === "indigo" ? "bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700" : color === "pink" ? "bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700" : "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700"}` : variant === "outline" ? color === "blue" ? "border-2 border-blue-500 bg-transparent text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20" : color === "purple" ? "border-2 border-purple-500 bg-transparent text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20" : color === "green" ? "border-2 border-green-500 bg-transparent text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20" : color === "orange" ? "border-2 border-orange-500 bg-transparent text-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-900/20" : color === "red" ? "border-2 border-red-500 bg-transparent text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20" : color === "indigo" ? "border-2 border-indigo-500 bg-transparent text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/20" : color === "pink" ? "border-2 border-pink-500 bg-transparent text-pink-600 hover:bg-pink-50 dark:text-pink-400 dark:hover:bg-pink-900/20" : "border-2 border-gray-500 bg-transparent text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900/20" : `text-white ${color === "blue" ? "bg-blue-600 hover:bg-blue-700" : color === "purple" ? "bg-purple-600 hover:bg-purple-700" : color === "green" ? "bg-green-600 hover:bg-green-700" : color === "orange" ? "bg-orange-600 hover:bg-orange-700" : color === "red" ? "bg-red-600 hover:bg-red-700" : color === "indigo" ? "bg-indigo-600 hover:bg-indigo-700" : color === "pink" ? "bg-pink-600 hover:bg-pink-700" : "bg-gray-600 hover:bg-gray-700"}`;
    const iconBgClasses = isGradient || variant === "solid" ? "bg-white/20" : variant === "outline" ? color === "blue" ? "bg-blue-100 dark:bg-blue-900/30" : color === "purple" ? "bg-purple-100 dark:bg-purple-900/30" : color === "green" ? "bg-green-100 dark:bg-green-900/30" : color === "orange" ? "bg-orange-100 dark:bg-orange-900/30" : color === "red" ? "bg-red-100 dark:bg-red-900/30" : color === "indigo" ? "bg-indigo-100 dark:bg-indigo-900/30" : color === "pink" ? "bg-pink-100 dark:bg-pink-900/30" : "bg-gray-100 dark:bg-gray-900/30" : "";
    const baseClasses = merge(
      "rounded-2xl p-6 transition-all shadow-lg hover:shadow-xl text-center",
      variantClasses,
      className
    );
    const content = /* @__PURE__ */ jsxs(Fragment, { children: [
      icon && /* @__PURE__ */ jsx("div", { className: merge(
        "w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2",
        iconBgClasses
      ), children: typeof icon === "string" ? /* @__PURE__ */ jsx(
        Icon,
        {
          name: icon,
          className: merge(
            "w-6 h-6",
            isTextWhite ? "text-white" : ""
          )
        }
      ) : icon }),
      /* @__PURE__ */ jsx("h3", { className: merge(
        "text-xl font-semibold mb-1",
        isTextWhite ? "text-white" : ""
      ), children: title }),
      description && /* @__PURE__ */ jsx("p", { className: merge(
        "text-sm",
        isTextWhite ? "text-white/90" : "text-gray-600 dark:text-gray-300"
      ), children: description }),
      loading && /* @__PURE__ */ jsx("div", { className: "mt-2 h-4 bg-white/20 rounded animate-pulse" })
    ] });
    if (href) {
      return /* @__PURE__ */ jsx(
        "a",
        {
          ref,
          href,
          className: baseClasses,
          ...props,
          children: content
        }
      );
    }
    return /* @__PURE__ */ jsx(
      "button",
      {
        ref,
        onClick,
        className: baseClasses,
        ...props,
        children: content
      }
    );
  }
);
QuickActionCard.displayName = "QuickActionCard";
var DashboardGrid = React61__default.forwardRef(
  ({
    columns = 4,
    gap = "md",
    responsive = true,
    className,
    children,
    ...props
  }, ref) => {
    const gridClasses = responsive ? columns === 1 ? "grid-cols-1" : columns === 2 ? "grid-cols-1 md:grid-cols-2" : columns === 3 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : columns === 4 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : columns === 5 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6" : columns === 1 ? "grid-cols-1" : columns === 2 ? "grid-cols-2" : columns === 3 ? "grid-cols-3" : columns === 4 ? "grid-cols-4" : columns === 5 ? "grid-cols-5" : "grid-cols-6";
    const gapClasses = gap === "sm" ? "gap-3" : gap === "md" ? "gap-6" : gap === "lg" ? "gap-8" : "gap-12";
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: merge(
          "grid",
          gridClasses,
          gapClasses,
          className
        ),
        ...props,
        children
      }
    );
  }
);
DashboardGrid.displayName = "DashboardGrid";
var ActivityFeed = React61__default.forwardRef(
  ({
    title,
    items,
    emptyMessage = "\uD65C\uB3D9 \uB0B4\uC5ED\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.",
    showHeader = true,
    maxItems,
    onViewAll,
    viewAllLabel = "\uC804\uCCB4 \uBCF4\uAE30",
    className,
    ...props
  }, ref) => {
    const displayItems = maxItems ? items.slice(0, maxItems) : items;
    const hasMore = maxItems && items.length > maxItems;
    const formatTimestamp = (timestamp) => {
      const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
      const now = /* @__PURE__ */ new Date();
      const diff = now.getTime() - date.getTime();
      const minutes = Math.floor(diff / 6e4);
      const hours = Math.floor(diff / 36e5);
      const days = Math.floor(diff / 864e5);
      if (minutes < 1) return "\uBC29\uAE08 \uC804";
      if (minutes < 60) return `${minutes}\uBD84 \uC804`;
      if (hours < 24) return `${hours}\uC2DC\uAC04 \uC804`;
      if (days < 7) return `${days}\uC77C \uC804`;
      return date.toLocaleDateString("ko-KR");
    };
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: merge(
          "bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700",
          className
        ),
        ...props,
        children: [
          showHeader && title && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-800 dark:text-white flex items-center", children: title }),
            onViewAll && /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: onViewAll,
                className: "text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium text-sm transition-colors",
                children: [
                  viewAllLabel,
                  " \u2192"
                ]
              }
            )
          ] }),
          displayItems.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "divide-y divide-gray-200 dark:divide-gray-700", children: [
            displayItems.map((item) => /* @__PURE__ */ jsxs(
              "div",
              {
                onClick: item.onClick,
                className: merge(
                  "p-4 transition-colors",
                  item.onClick && "hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer group"
                ),
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-2", children: [
                    /* @__PURE__ */ jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
                      item.icon && /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 mt-0.5", children: typeof item.icon === "string" ? /* @__PURE__ */ jsx(
                        Icon,
                        {
                          name: item.icon,
                          className: "w-4 h-4 text-purple-600 dark:text-purple-400"
                        }
                      ) : item.icon }),
                      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold text-gray-800 dark:text-white mb-1 truncate", children: item.title }),
                        item.description && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 dark:text-gray-300 line-clamp-2", children: item.description })
                      ] })
                    ] }) }),
                    item.badge && /* @__PURE__ */ jsx("div", { className: "ml-2 flex-shrink-0", children: typeof item.badge === "string" ? /* @__PURE__ */ jsx("span", { className: "px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300", children: item.badge }) : item.badge })
                  ] }),
                  item.metadata && Object.keys(item.metadata).length > 0 && /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1 flex-wrap mt-2", children: Object.entries(item.metadata).map(([key, value]) => /* @__PURE__ */ jsxs(
                    "span",
                    {
                      className: "text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded",
                      children: [
                        key,
                        ": ",
                        String(value)
                      ]
                    },
                    key
                  )) }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-2", children: formatTimestamp(item.timestamp) })
                ]
              },
              item.id
            )),
            hasMore && /* @__PURE__ */ jsx("div", { className: "p-4 text-center border-t border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: onViewAll,
                className: "inline-flex items-center text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors",
                children: [
                  /* @__PURE__ */ jsx("span", { children: "\uB354 \uB9CE\uC740 \uD65C\uB3D9 \uBCF4\uAE30" }),
                  /* @__PURE__ */ jsxs("span", { className: "ml-1", children: [
                    "(",
                    items.length - (maxItems || 0),
                    "\uAC1C \uB354)"
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "ml-1", children: "\u2192" })
                ]
              }
            ) })
          ] }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
            /* @__PURE__ */ jsx("span", { className: "text-4xl mb-3 block", children: "\u{1F4ED}" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-400 text-sm", children: emptyMessage })
          ] })
        ]
      }
    );
  }
);
ActivityFeed.displayName = "ActivityFeed";
var tierStyles = {
  basic: {
    badge: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
    icon: "text-blue-600 dark:text-blue-400"
  },
  pro: {
    badge: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
    icon: "text-purple-600 dark:text-purple-400"
  },
  premium: {
    badge: "bg-gradient-to-r from-yellow-400 to-orange-500 text-white",
    icon: "text-yellow-600 dark:text-yellow-400"
  },
  admin: {
    badge: "bg-gradient-to-r from-red-500 to-pink-500 text-white",
    icon: "text-red-600 dark:text-red-400"
  }
};
var tierLabels = {
  basic: "Basic",
  pro: "Pro",
  premium: "Premium",
  admin: "Admin"
};
var ProfileCard = React61__default.forwardRef(
  ({
    name,
    email,
    avatar,
    avatarAlt,
    greeting,
    memberSince,
    membershipTier,
    membershipLabel,
    onSettingsClick,
    settingsHref,
    variant = "default",
    showAvatar = true,
    showMembership = true,
    showSettings = true,
    className,
    ...props
  }, ref) => {
    const formatDate = (date) => {
      const d = typeof date === "string" ? new Date(date) : date;
      return d.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    const tier = membershipTier || "basic";
    const tierStyle = tierStyles[tier];
    const tierLabel = membershipLabel || tierLabels[tier];
    const variantClasses = {
      default: "bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700",
      gradient: "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20",
      minimal: "bg-transparent"
    };
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: merge(
          "relative overflow-hidden p-6",
          variantClasses[variant],
          className
        ),
        ...props,
        children: [
          variant === "gradient" && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-10 dark:opacity-20" }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 opacity-5 dark:opacity-15" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative flex items-start gap-6", children: [
            showSettings && (onSettingsClick || settingsHref) && /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0", children: settingsHref ? /* @__PURE__ */ jsx(
              "a",
              {
                href: settingsHref,
                className: "p-2 text-gray-400 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",
                title: "\uC124\uC815",
                children: /* @__PURE__ */ jsx(Icon, { name: "settings", className: "w-6 h-6" })
              }
            ) : /* @__PURE__ */ jsx(
              "button",
              {
                onClick: onSettingsClick,
                className: "p-2 text-gray-400 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",
                title: "\uC124\uC815",
                children: /* @__PURE__ */ jsx(Icon, { name: "settings", className: "w-6 h-6" })
              }
            ) }),
            showAvatar && /* @__PURE__ */ jsx("div", { className: "relative flex-shrink-0", children: avatar ? /* @__PURE__ */ jsx(
              "img",
              {
                src: avatar,
                alt: avatarAlt || name,
                className: "w-20 h-20 rounded-full border-4 border-white dark:border-gray-700 shadow-lg object-cover"
              }
            ) : /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-4 border-white dark:border-gray-700 shadow-lg", children: /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-white", children: name.charAt(0).toUpperCase() }) }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
              greeting && /* @__PURE__ */ jsx("div", { className: "text-lg sm:text-xl font-semibold mb-2", children: greeting.split(" ").map((part, index) => {
                const isEmoji = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(part);
                return /* @__PURE__ */ jsxs("span", { children: [
                  isEmoji ? /* @__PURE__ */ jsx("span", { className: "text-gray-900 dark:text-white", children: part }) : /* @__PURE__ */ jsx("span", { className: "text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent", children: part }),
                  index < greeting.split(" ").length - 1 && " "
                ] }, index);
              }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 sm:gap-3 mb-2", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate", children: [
                  name,
                  "!"
                ] }),
                showMembership && membershipTier && /* @__PURE__ */ jsxs(
                  "span",
                  {
                    className: merge(
                      "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-lg",
                      tierStyle.badge
                    ),
                    children: [
                      /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 mr-1", fill: "currentColor", viewBox: "0 0 20 20", children: tier === "premium" ? /* @__PURE__ */ jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) : tier === "admin" ? /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z", clipRule: "evenodd" }) : /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }),
                      tierLabel
                    ]
                  }
                )
              ] }),
              email && /* @__PURE__ */ jsx("div", { className: "text-gray-600 dark:text-gray-400 text-sm mb-1 truncate", children: email }),
              memberSince && /* @__PURE__ */ jsxs("div", { className: "text-gray-400 text-xs flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(Icon, { name: "clock", className: "w-3 h-3" }),
                "\uAC00\uC785\uC77C ",
                formatDate(memberSince)
              ] })
            ] })
          ] })
        ]
      }
    );
  }
);
ProfileCard.displayName = "ProfileCard";
var tierConfig = {
  basic: {
    gradient: "bg-gradient-to-r from-blue-500 to-cyan-500",
    label: "Basic"
  },
  pro: {
    gradient: "bg-gradient-to-r from-purple-500 to-pink-500",
    label: "Pro"
  },
  premium: {
    gradient: "bg-gradient-to-r from-yellow-400 to-orange-500",
    label: "Premium"
  },
  admin: {
    gradient: "bg-gradient-to-r from-red-500 to-pink-500",
    label: "Admin"
  }
};
var sizeClasses = {
  sm: {
    container: "px-2 py-0.5 text-xs",
    icon: "w-2.5 h-2.5"
  },
  md: {
    container: "px-3 py-1 text-xs",
    icon: "w-3 h-3"
  },
  lg: {
    container: "px-4 py-1.5 text-sm",
    icon: "w-4 h-4"
  }
};
var MembershipBadge = React61__default.forwardRef(
  ({
    tier,
    label,
    size = "md",
    showIcon = true,
    className,
    ...props
  }, ref) => {
    const config = tierConfig[tier];
    const sizeStyle = sizeClasses[size];
    const displayLabel = label || config.label;
    const getIcon = () => {
      if (!showIcon) return null;
      if (tier === "premium") {
        return /* @__PURE__ */ jsx("svg", { className: sizeStyle.icon, fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) });
      }
      if (tier === "admin") {
        return /* @__PURE__ */ jsx("svg", { className: sizeStyle.icon, fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z", clipRule: "evenodd" }) });
      }
      return /* @__PURE__ */ jsx("svg", { className: sizeStyle.icon, fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) });
    };
    return /* @__PURE__ */ jsxs(
      "span",
      {
        ref,
        className: merge(
          "inline-flex items-center rounded-full font-semibold text-white shadow-lg",
          config.gradient,
          sizeStyle.container,
          className
        ),
        ...props,
        children: [
          showIcon && /* @__PURE__ */ jsx("span", { className: "mr-1", children: getIcon() }),
          displayLabel
        ]
      }
    );
  }
);
MembershipBadge.displayName = "MembershipBadge";
var colorClasses2 = {
  blue: {
    default: "bg-gradient-to-t from-blue-500 to-blue-400",
    highlight: "bg-gradient-to-t from-blue-600 to-blue-500 shadow-lg"
  },
  purple: {
    default: "bg-gradient-to-t from-purple-500 to-purple-400",
    highlight: "bg-gradient-to-t from-purple-600 to-purple-500 shadow-lg"
  },
  green: {
    default: "bg-gradient-to-t from-green-500 to-green-400",
    highlight: "bg-gradient-to-t from-green-600 to-green-500 shadow-lg"
  },
  orange: {
    default: "bg-gradient-to-t from-orange-500 to-orange-400",
    highlight: "bg-gradient-to-t from-orange-600 to-orange-500 shadow-lg"
  },
  red: {
    default: "bg-gradient-to-t from-red-500 to-red-400",
    highlight: "bg-gradient-to-t from-red-600 to-red-500 shadow-lg"
  },
  indigo: {
    default: "bg-gradient-to-t from-indigo-500 to-indigo-400",
    highlight: "bg-gradient-to-t from-indigo-600 to-indigo-500 shadow-lg"
  },
  pink: {
    default: "bg-gradient-to-t from-pink-500 to-pink-400",
    highlight: "bg-gradient-to-t from-pink-600 to-pink-500 shadow-lg"
  },
  gray: {
    default: "bg-gradient-to-t from-gray-500 to-gray-400",
    highlight: "bg-gradient-to-t from-gray-600 to-gray-500 shadow-lg"
  }
};
var MiniBarChart = React61__default.forwardRef(
  ({
    data,
    labels,
    maxValue,
    height = 160,
    showTooltip = true,
    showStats = true,
    color = "blue",
    highlightToday = true,
    todayIndex,
    className,
    ...props
  }, ref) => {
    const colors = colorClasses2[color];
    const calculatedMax = maxValue || Math.max(...data, 1);
    const fixedMax = Math.max(calculatedMax, 10);
    const todayIdx = todayIndex !== void 0 ? todayIndex : data.length - 1;
    const calculateHeight = (value) => {
      if (fixedMax === 0) return 8;
      return Math.max(value / fixedMax * height, 8);
    };
    const total = data.reduce((sum, val) => sum + val, 0);
    const average = data.length > 0 ? Math.round(total / data.length) : 0;
    const max = Math.max(...data);
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: merge("w-full", className),
        ...props,
        children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex items-end justify-between gap-2 px-2 relative",
              style: { height: `${height + 40}px` },
              children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-x-2 bottom-8 border-t border-gray-200 dark:border-gray-700 opacity-50" }),
                data.map((value, index) => {
                  const isToday = highlightToday && index === todayIdx;
                  const barHeight = calculateHeight(value);
                  const barColor = isToday ? colors.highlight : colors.default;
                  return /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: "flex flex-col items-center flex-1 group relative",
                      children: [
                        showTooltip && /* @__PURE__ */ jsxs("div", { className: "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10", children: [
                          value,
                          "\uAC1C",
                          /* @__PURE__ */ jsx("div", { className: "absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700" })
                        ] }),
                        /* @__PURE__ */ jsx("div", { className: "text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200", children: value }),
                        /* @__PURE__ */ jsx("div", { className: "relative w-full flex-1 flex items-end", children: /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: merge(
                              "w-full rounded-t-lg transition-all duration-500 ease-out group-hover:scale-105",
                              barColor
                            ),
                            style: {
                              height: `${barHeight}px`,
                              minHeight: "8px"
                            },
                            children: value > 0 && /* @__PURE__ */ jsx("div", { className: "absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white dark:bg-gray-800 rounded-full shadow-sm" })
                          }
                        ) }),
                        labels && labels[index] && /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: merge(
                              "text-xs font-medium mt-2 transition-colors duration-200",
                              isToday ? "text-purple-600 dark:text-purple-400" : "text-gray-500 dark:text-gray-400"
                            ),
                            children: labels[index]
                          }
                        )
                      ]
                    },
                    index
                  );
                })
              ]
            }
          ),
          showStats && /* @__PURE__ */ jsxs("div", { className: "mt-4 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 px-2", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              "\uCD1D: ",
              total
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              "\uD3C9\uADE0: ",
              average
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              "\uCD5C\uACE0: ",
              max
            ] })
          ] })
        ]
      }
    );
  }
);
MiniBarChart.displayName = "MiniBarChart";
var colorClasses3 = {
  blue: {
    default: "bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20",
    gradient: "bg-gradient-to-br from-blue-500 to-indigo-600",
    outline: "border-2 border-blue-500 bg-transparent",
    icon: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    button: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700",
    decoration: "from-blue-400/10 to-transparent"
  },
  purple: {
    default: "bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20",
    gradient: "bg-gradient-to-br from-purple-500 to-pink-600",
    outline: "border-2 border-purple-500 bg-transparent",
    icon: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    button: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
    decoration: "from-purple-400/10 to-transparent"
  },
  green: {
    default: "bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20",
    gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
    outline: "border-2 border-green-500 bg-transparent",
    icon: "bg-green-500/10 text-green-600 dark:text-green-400",
    button: "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700",
    decoration: "from-green-400/10 to-transparent"
  },
  orange: {
    default: "bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20",
    gradient: "bg-gradient-to-br from-orange-500 to-amber-600",
    outline: "border-2 border-orange-500 bg-transparent",
    icon: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    button: "bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700",
    decoration: "from-orange-400/10 to-transparent"
  },
  red: {
    default: "bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-900/20 dark:to-rose-900/20",
    gradient: "bg-gradient-to-br from-red-500 to-rose-600",
    outline: "border-2 border-red-500 bg-transparent",
    icon: "bg-red-500/10 text-red-600 dark:text-red-400",
    button: "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700",
    decoration: "from-red-400/10 to-transparent"
  },
  indigo: {
    default: "bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-900/20 dark:to-blue-900/20",
    gradient: "bg-gradient-to-br from-indigo-500 to-blue-600",
    outline: "border-2 border-indigo-500 bg-transparent",
    icon: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    button: "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700",
    decoration: "from-indigo-400/10 to-transparent"
  },
  pink: {
    default: "bg-gradient-to-br from-pink-50 to-rose-100 dark:from-pink-900/20 dark:to-rose-900/20",
    gradient: "bg-gradient-to-br from-pink-500 to-rose-600",
    outline: "border-2 border-pink-500 bg-transparent",
    icon: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
    button: "bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700",
    decoration: "from-pink-400/10 to-transparent"
  },
  gray: {
    default: "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20",
    gradient: "bg-gradient-to-br from-gray-500 to-gray-600",
    outline: "border-2 border-gray-500 bg-transparent",
    icon: "bg-gray-500/10 text-gray-600 dark:text-gray-400",
    button: "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800",
    decoration: "from-gray-400/10 to-transparent"
  }
};
var SummaryCard = React61__default.forwardRef(
  ({
    title,
    value,
    subtitle,
    icon,
    color = "blue",
    variant = "default",
    href,
    onClick,
    loading = false,
    badge,
    footer,
    showAction = true,
    actionLabel = "\uC790\uC138\uD788 \uBCF4\uAE30",
    className,
    ...props
  }, ref) => {
    const colors = colorClasses3[color];
    const isGradient = variant === "gradient";
    const isTextWhite = isGradient;
    const variantClasses = {
      default: `rounded-xl shadow-lg ${colors.default}`,
      gradient: `rounded-xl shadow-xl text-white ${colors.gradient}`,
      outline: `rounded-xl ${colors.outline}`
    };
    const formatValue = (val) => {
      if (typeof val === "number") {
        return val.toLocaleString();
      }
      return val;
    };
    const content = /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: merge(
          "p-6 flex flex-col min-h-[220px] relative overflow-hidden group hover:shadow-xl transition-all duration-300",
          variantClasses[variant],
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsx("div", { className: `absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${colors.decoration} rounded-full -translate-y-16 translate-x-16` }),
          /* @__PURE__ */ jsx("div", { className: `absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr ${colors.decoration} rounded-full translate-y-12 -translate-x-12` }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4 relative z-10", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              icon && /* @__PURE__ */ jsx("div", { className: merge(
                "p-2 rounded-lg",
                isGradient ? "bg-white/20" : colors.icon
              ), children: typeof icon === "string" ? /* @__PURE__ */ jsx(
                Icon,
                {
                  name: icon,
                  className: merge(
                    "w-6 h-6",
                    isTextWhite ? "text-white" : ""
                  )
                }
              ) : icon }),
              /* @__PURE__ */ jsx("span", { className: merge(
                "text-lg font-semibold ml-3",
                isTextWhite ? "text-white" : "text-gray-900 dark:text-white"
              ), children: title })
            ] }),
            badge && /* @__PURE__ */ jsx("div", { className: "text-xs font-medium", children: typeof badge === "string" ? /* @__PURE__ */ jsx("span", { className: merge(
              "px-2 py-1 rounded-full",
              isGradient ? "bg-white/20 text-white" : "bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300"
            ), children: badge }) : badge })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 flex flex-col justify-center relative z-10", children: loading ? /* @__PURE__ */ jsx("div", { className: "h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("div", { className: merge(
              "text-3xl font-bold mb-2",
              isTextWhite ? "text-white" : "text-gray-900 dark:text-white"
            ), children: formatValue(value) }),
            subtitle && /* @__PURE__ */ jsx("div", { className: merge(
              "text-sm mb-4",
              isTextWhite ? "text-white/90" : "text-gray-600 dark:text-gray-400"
            ), children: subtitle })
          ] }) }),
          footer && /* @__PURE__ */ jsx("div", { className: "relative z-10 mb-4", children: footer }),
          showAction && (href || onClick) && /* @__PURE__ */ jsx("div", { className: "relative z-10", children: href ? /* @__PURE__ */ jsx(
            "a",
            {
              href,
              className: merge(
                "block w-full text-center py-3 rounded-lg font-semibold text-white hover:shadow-lg transition-all duration-200 group-hover:scale-[1.02]",
                colors.button
              ),
              children: actionLabel
            }
          ) : /* @__PURE__ */ jsx(
            "button",
            {
              onClick,
              className: merge(
                "block w-full text-center py-3 rounded-lg font-semibold text-white hover:shadow-lg transition-all duration-200 group-hover:scale-[1.02]",
                colors.button
              ),
              children: actionLabel
            }
          ) })
        ]
      }
    );
    return content;
  }
);
SummaryCard.displayName = "SummaryCard";
var typeStyles = {
  info: {
    container: "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
    border: "border-blue-200/50 dark:border-blue-700/30",
    dot: "bg-blue-500"
  },
  warning: {
    container: "bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
    border: "border-orange-200/50 dark:border-orange-700/30",
    dot: "bg-red-500"
  },
  error: {
    container: "bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20",
    border: "border-red-200/50 dark:border-red-700/30",
    dot: "bg-red-600"
  },
  success: {
    container: "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
    border: "border-green-200/50 dark:border-green-700/30",
    dot: "bg-green-500"
  }
};
var defaultTypeStyles = {
  container: "bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20",
  border: "border-gray-200/50 dark:border-gray-700/30",
  dot: "bg-gray-500"
};
var NotificationCard = React61__default.forwardRef(
  ({
    title = "\uC54C\uB9BC \uBC0F \uACF5\uC9C0",
    items,
    emptyMessage = "\uC54C\uB9BC\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.",
    maxItems,
    onViewAll,
    viewAllLabel = "\uBAA8\uB4E0 \uC54C\uB9BC \uBCF4\uAE30",
    showHeader = true,
    showCount = true,
    className,
    ...props
  }, ref) => {
    const displayItems = maxItems ? items.slice(0, maxItems) : items;
    const hasMore = maxItems && items.length > maxItems;
    const formatTimestamp = (timestamp) => {
      const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
      const now = /* @__PURE__ */ new Date();
      const diff = now.getTime() - date.getTime();
      const minutes = Math.floor(diff / 6e4);
      const hours = Math.floor(diff / 36e5);
      const days = Math.floor(diff / 864e5);
      if (minutes < 1) return "\uBC29\uAE08 \uC804";
      if (minutes < 60) return `${minutes}\uBD84 \uC804`;
      if (hours < 24) return `${hours}\uC2DC\uAC04 \uC804`;
      if (days < 7) return `${days}\uC77C \uC804`;
      return date.toLocaleDateString("ko-KR");
    };
    const getTypeStyles = (type) => {
      if (!type) return defaultTypeStyles;
      return typeStyles[type];
    };
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: merge(
          "bg-white dark:bg-gray-800 rounded-xl shadow p-6",
          className
        ),
        ...props,
        children: [
          showHeader && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx("div", { className: "p-2 bg-orange-500/10 rounded-lg mr-3", children: /* @__PURE__ */ jsx(Icon, { name: "bell", className: "w-6 h-6 text-orange-600 dark:text-orange-400" }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: title })
            ] }),
            showCount && items.length > 0 && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300", children: [
              items.length,
              "\uAC1C"
            ] })
          ] }),
          displayItems.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-3", children: displayItems.map((item) => {
            const typeStyle = getTypeStyles(item.type);
            const content = /* @__PURE__ */ jsx(
              "div",
              {
                className: merge(
                  "p-3 rounded-lg border",
                  typeStyle.container,
                  typeStyle.border,
                  (item.onClick || item.href) && "cursor-pointer hover:shadow-md transition-all duration-200"
                ),
                children: /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
                  /* @__PURE__ */ jsx("div", { className: merge(
                    "w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0",
                    typeStyle.dot
                  ) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-gray-900 dark:text-white", children: item.title }),
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0", children: formatTimestamp(item.timestamp) })
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600 dark:text-gray-400", children: item.message })
                  ] })
                ] })
              }
            );
            if (item.href) {
              return /* @__PURE__ */ jsx("a", { href: item.href, children: content }, item.id);
            }
            if (item.onClick) {
              return /* @__PURE__ */ jsx("div", { onClick: item.onClick, children: content }, item.id);
            }
            return /* @__PURE__ */ jsx("div", { children: content }, item.id);
          }) }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
            /* @__PURE__ */ jsx(Icon, { name: "bell", className: "w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-400 text-sm", children: emptyMessage })
          ] }),
          hasMore && onViewAll && /* @__PURE__ */ jsx("div", { className: "mt-4 text-center", children: /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: onViewAll,
              className: "text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 font-medium transition-colors",
              children: [
                viewAllLabel,
                " (",
                items.length - (maxItems || 0),
                "\uAC1C \uB354)"
              ]
            }
          ) })
        ]
      }
    );
  }
);
NotificationCard.displayName = "NotificationCard";
var MetricCard = React61__default.forwardRef(
  ({
    title,
    value,
    description,
    icon,
    trend,
    chartData,
    chartLabels,
    variant = "elevated",
    color = "blue",
    loading = false,
    showChart = false,
    className,
    ...props
  }, ref) => {
    const isGradient = variant === "gradient";
    const isTextWhite = isGradient;
    const variantClasses = variant === "default" ? `rounded-2xl border ${color === "blue" ? "border-blue-200 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-900/10" : color === "purple" ? "border-purple-200 dark:border-purple-700 bg-purple-50/50 dark:bg-purple-900/10" : color === "green" ? "border-green-200 dark:border-green-700 bg-green-50/50 dark:bg-green-900/10" : color === "orange" ? "border-orange-200 dark:border-orange-700 bg-orange-50/50 dark:bg-orange-900/10" : color === "red" ? "border-red-200 dark:border-red-700 bg-red-50/50 dark:bg-red-900/10" : color === "indigo" ? "border-indigo-200 dark:border-indigo-700 bg-indigo-50/50 dark:bg-indigo-900/10" : color === "pink" ? "border-pink-200 dark:border-pink-700 bg-pink-50/50 dark:bg-pink-900/10" : "border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/10"}` : variant === "gradient" ? `rounded-2xl border text-white ${color === "blue" ? "bg-gradient-to-br from-blue-500 to-blue-600 border-blue-400 dark:border-blue-500" : color === "purple" ? "bg-gradient-to-br from-purple-500 to-purple-600 border-purple-400 dark:border-purple-500" : color === "green" ? "bg-gradient-to-br from-green-500 to-green-600 border-green-400 dark:border-green-500" : color === "orange" ? "bg-gradient-to-br from-orange-500 to-orange-600 border-orange-400 dark:border-orange-500" : color === "red" ? "bg-gradient-to-br from-red-500 to-red-600 border-red-400 dark:border-red-500" : color === "indigo" ? "bg-gradient-to-br from-indigo-500 to-indigo-600 border-indigo-400 dark:border-indigo-500" : color === "pink" ? "bg-gradient-to-br from-pink-500 to-pink-600 border-pink-400 dark:border-pink-500" : "bg-gradient-to-br from-gray-500 to-gray-600 border-gray-400 dark:border-gray-500"}` : variant === "outline" ? `rounded-2xl ${color === "blue" ? "border-2 border-blue-300 dark:border-blue-600 bg-transparent" : color === "purple" ? "border-2 border-purple-300 dark:border-purple-600 bg-transparent" : color === "green" ? "border-2 border-green-300 dark:border-green-600 bg-transparent" : color === "orange" ? "border-2 border-orange-300 dark:border-orange-600 bg-transparent" : color === "red" ? "border-2 border-red-300 dark:border-red-600 bg-transparent" : color === "indigo" ? "border-2 border-indigo-300 dark:border-indigo-600 bg-transparent" : color === "pink" ? "border-2 border-pink-300 dark:border-pink-600 bg-transparent" : "border-2 border-gray-300 dark:border-gray-600 bg-transparent"}` : `rounded-3xl border ${color === "blue" ? "border-blue-200 dark:border-blue-700 bg-white dark:bg-gray-800 shadow-lg" : color === "purple" ? "border-purple-200 dark:border-purple-700 bg-white dark:bg-gray-800 shadow-lg" : color === "green" ? "border-green-200 dark:border-green-700 bg-white dark:bg-gray-800 shadow-lg" : color === "orange" ? "border-orange-200 dark:border-orange-700 bg-white dark:bg-gray-800 shadow-lg" : color === "red" ? "border-red-200 dark:border-red-700 bg-white dark:bg-gray-800 shadow-lg" : color === "indigo" ? "border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 shadow-lg" : color === "pink" ? "border-pink-200 dark:border-pink-700 bg-white dark:bg-gray-800 shadow-lg" : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg"}`;
    const iconClasses = isGradient ? "bg-white/20" : color === "blue" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : color === "purple" ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" : color === "green" ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" : color === "orange" ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400" : color === "red" ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" : color === "indigo" ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" : color === "pink" ? "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400" : "bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400";
    const badgeClasses = isGradient ? "bg-white/20 text-white" : color === "blue" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : color === "purple" ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300" : color === "green" ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300" : color === "orange" ? "bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300" : color === "red" ? "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300" : color === "indigo" ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300" : color === "pink" ? "bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300" : "bg-gray-50 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300";
    const formatValue = (val) => {
      if (typeof val === "number") {
        return val.toLocaleString();
      }
      return val;
    };
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: merge(
          "p-6 transition-all duration-200 hover:shadow-xl",
          variantClasses,
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-4", children: [
            icon && /* @__PURE__ */ jsx("div", { className: merge(
              "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0",
              iconClasses
            ), children: typeof icon === "string" ? /* @__PURE__ */ jsx(
              Icon,
              {
                name: icon,
                className: merge(
                  "w-6 h-6",
                  isTextWhite ? "text-white" : ""
                )
              }
            ) : icon }),
            title && /* @__PURE__ */ jsx("span", { className: merge(
              "text-sm px-3 py-1 rounded-full font-medium",
              badgeClasses
            ), children: title })
          ] }),
          loading ? /* @__PURE__ */ jsx("div", { className: "h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" }) : /* @__PURE__ */ jsx("h3", { className: merge(
            "text-3xl font-bold mb-1",
            isTextWhite ? "text-white" : "text-gray-800 dark:text-white"
          ), children: formatValue(value) }),
          description && /* @__PURE__ */ jsx("p", { className: merge(
            "text-sm mb-3",
            isTextWhite ? "text-white/90" : "text-gray-600 dark:text-gray-300"
          ), children: description }),
          showChart && chartData && chartData.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-4 mb-3", children: /* @__PURE__ */ jsx(
            MiniBarChart,
            {
              data: chartData,
              labels: chartLabels,
              color,
              height: 100,
              showStats: false
            }
          ) }),
          trend && !loading && /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxs(
              "span",
              {
                className: merge(
                  "text-xs font-medium",
                  trend.positive !== false ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                ),
                children: [
                  trend.positive !== false ? "\u2191" : "\u2193",
                  " ",
                  Math.abs(trend.value),
                  "%"
                ]
              }
            ),
            /* @__PURE__ */ jsx("span", { className: merge(
              "text-xs",
              isTextWhite ? "text-white/70" : "text-gray-500 dark:text-gray-400"
            ), children: trend.label })
          ] })
        ]
      }
    );
  }
);
MetricCard.displayName = "MetricCard";
var colorClasses4 = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-700",
    progress: "bg-blue-500",
    gradient: "from-blue-500 to-blue-600",
    text: "text-blue-600 dark:text-blue-400",
    icon: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-900/20",
    border: "border-purple-200 dark:border-purple-700",
    progress: "bg-purple-500",
    gradient: "from-purple-500 to-purple-600",
    text: "text-purple-600 dark:text-purple-400",
    icon: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
  },
  green: {
    bg: "bg-green-50 dark:bg-green-900/20",
    border: "border-green-200 dark:border-green-700",
    progress: "bg-green-500",
    gradient: "from-green-500 to-green-600",
    text: "text-green-600 dark:text-green-400",
    icon: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
  },
  orange: {
    bg: "bg-orange-50 dark:bg-orange-900/20",
    border: "border-orange-200 dark:border-orange-700",
    progress: "bg-orange-500",
    gradient: "from-orange-500 to-orange-600",
    text: "text-orange-600 dark:text-orange-400",
    icon: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
  },
  red: {
    bg: "bg-red-50 dark:bg-red-900/20",
    border: "border-red-200 dark:border-red-700",
    progress: "bg-red-500",
    gradient: "from-red-500 to-red-600",
    text: "text-red-600 dark:text-red-400",
    icon: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
  },
  indigo: {
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
    border: "border-indigo-200 dark:border-indigo-700",
    progress: "bg-indigo-500",
    gradient: "from-indigo-500 to-indigo-600",
    text: "text-indigo-600 dark:text-indigo-400",
    icon: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
  },
  pink: {
    bg: "bg-pink-50 dark:bg-pink-900/20",
    border: "border-pink-200 dark:border-pink-700",
    progress: "bg-pink-500",
    gradient: "from-pink-500 to-pink-600",
    text: "text-pink-600 dark:text-pink-400",
    icon: "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400"
  },
  gray: {
    bg: "bg-gray-50 dark:bg-gray-900/20",
    border: "border-gray-200 dark:border-gray-700",
    progress: "bg-gray-500",
    gradient: "from-gray-500 to-gray-600",
    text: "text-gray-600 dark:text-gray-400",
    icon: "bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400"
  }
};
var sizeStyles = {
  sm: {
    container: "p-4",
    icon: "w-8 h-8",
    iconSize: "w-4 h-4",
    title: "text-sm",
    value: "text-xl",
    progress: "h-1.5"
  },
  md: {
    container: "p-6",
    icon: "w-12 h-12",
    iconSize: "w-6 h-6",
    title: "text-base",
    value: "text-2xl",
    progress: "h-2"
  },
  lg: {
    container: "p-8",
    icon: "w-16 h-16",
    iconSize: "w-8 h-8",
    title: "text-lg",
    value: "text-3xl",
    progress: "h-3"
  }
};
var ProgressCard = React61__default.forwardRef(
  ({
    title,
    current,
    total,
    unit = "",
    description,
    icon,
    color = "blue",
    variant = "elevated",
    showPercentage = true,
    showLabel = true,
    size = "md",
    loading = false,
    className,
    ...props
  }, ref) => {
    const colors = colorClasses4[color];
    const sizes = sizeStyles[size];
    const percentage = total > 0 ? Math.min(Math.max(current / total * 100, 0), 100) : 0;
    const isGradient = variant === "gradient";
    const variantClasses = {
      default: `rounded-2xl border ${colors.border} ${colors.bg}`,
      gradient: `rounded-2xl border text-white bg-gradient-to-br ${colors.gradient}`,
      outline: `rounded-2xl border-2 ${colors.border} bg-transparent`,
      elevated: `rounded-3xl border ${colors.border} bg-white dark:bg-gray-800 shadow-lg`
    };
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: merge(
          "transition-all duration-200 hover:shadow-xl",
          variantClasses[variant],
          sizes.container,
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-4", children: [
            icon && /* @__PURE__ */ jsx(
              "div",
              {
                className: merge(
                  "rounded-lg flex items-center justify-center flex-shrink-0",
                  sizes.icon,
                  isGradient ? "bg-white/20" : colors.icon
                ),
                children: typeof icon === "string" ? /* @__PURE__ */ jsx(
                  Icon,
                  {
                    name: icon,
                    className: merge(
                      sizes.iconSize,
                      isGradient ? "text-white" : ""
                    )
                  }
                ) : icon
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 ml-4", children: [
              /* @__PURE__ */ jsx(
                "h3",
                {
                  className: merge(
                    "font-semibold mb-1",
                    sizes.title,
                    isGradient ? "text-white" : "text-gray-800 dark:text-white"
                  ),
                  children: title
                }
              ),
              description && /* @__PURE__ */ jsx(
                "p",
                {
                  className: merge(
                    "text-sm",
                    isGradient ? "text-white/90" : "text-gray-600 dark:text-gray-400"
                  ),
                  children: description
                }
              )
            ] })
          ] }),
          loading ? /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" }),
            /* @__PURE__ */ jsx("div", { className: "h-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between mb-2", children: [
              /* @__PURE__ */ jsxs(
                "span",
                {
                  className: merge(
                    "font-bold",
                    sizes.value,
                    isGradient ? "text-white" : colors.text
                  ),
                  children: [
                    current.toLocaleString(),
                    unit && /* @__PURE__ */ jsx("span", { className: "text-sm ml-1", children: unit })
                  ]
                }
              ),
              showLabel && /* @__PURE__ */ jsxs(
                "span",
                {
                  className: merge(
                    "text-sm",
                    isGradient ? "text-white/80" : "text-gray-600 dark:text-gray-400"
                  ),
                  children: [
                    "/ ",
                    total.toLocaleString(),
                    unit && /* @__PURE__ */ jsx("span", { className: "ml-1", children: unit })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
              "div",
              {
                className: merge(
                  "rounded-full transition-all duration-500",
                  sizes.progress,
                  isGradient ? `bg-gradient-to-r ${colors.gradient}` : colors.progress
                ),
                style: { width: `${percentage}%` }
              }
            ) }),
            showPercentage && /* @__PURE__ */ jsx("div", { className: "mt-2 flex justify-end", children: /* @__PURE__ */ jsxs(
              "span",
              {
                className: merge(
                  "text-xs font-semibold",
                  isGradient ? "text-white/90" : colors.text
                ),
                children: [
                  percentage.toFixed(1),
                  "%"
                ]
              }
            ) })
          ] })
        ]
      }
    );
  }
);
ProgressCard.displayName = "ProgressCard";
var StatsPanel = React61__default.forwardRef(
  ({
    title,
    items,
    columns = 4,
    loading = false,
    className,
    ...props
  }, ref) => {
    const baseCardClass = "rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] text-[var(--text-strong)] shadow-sm transition-colors";
    const accentStyles = {
      primary: {
        card: `${baseCardClass} ring-1 ring-[rgba(0,82,204,0.18)] dark:ring-[rgba(59,130,246,0.28)] bg-gradient-to-br from-[rgba(0,82,204,0.08)] via-transparent to-transparent dark:from-[rgba(59,130,246,0.18)]`,
        label: "text-[var(--brand-primary)]",
        value: "text-[var(--text-strong)]",
        icon: "text-[var(--brand-primary)]",
        iconWrapper: "bg-[rgba(0,82,204,0.12)] dark:bg-[rgba(59,130,246,0.25)]"
      },
      secondary: {
        card: `${baseCardClass} ring-1 ring-[rgba(11,122,91,0.18)] dark:ring-[rgba(52,211,153,0.25)] bg-gradient-to-br from-[rgba(0,200,151,0.08)] via-transparent to-transparent dark:from-[rgba(52,211,153,0.16)]`,
        label: "text-[var(--brand-secondary)]",
        value: "text-[var(--text-strong)]",
        icon: "text-[var(--brand-secondary)]",
        iconWrapper: "bg-[rgba(0,200,151,0.12)] dark:bg-[rgba(52,211,153,0.22)]"
      },
      warning: {
        card: `${baseCardClass} ring-1 ring-[rgba(245,158,11,0.2)] dark:ring-[rgba(251,191,36,0.32)] bg-gradient-to-br from-[rgba(245,158,11,0.1)] via-transparent to-transparent dark:from-[rgba(251,191,36,0.2)]`,
        label: "text-amber-600",
        value: "text-[var(--text-strong)]",
        icon: "text-amber-600",
        iconWrapper: "bg-[rgba(245,158,11,0.15)] dark:bg-[rgba(251,191,36,0.25)]"
      },
      neutral: {
        card: baseCardClass,
        label: "text-[var(--text-muted)]",
        value: "text-[var(--text-strong)]",
        icon: "text-[var(--text-muted)]",
        iconWrapper: "bg-[var(--surface-muted)]"
      }
    };
    const gridCols = {
      1: "grid-cols-1",
      2: "grid-cols-1 lg:grid-cols-2",
      3: "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3",
      4: "grid-cols-1 lg:grid-cols-2 xl:grid-cols-4"
    }[columns];
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: merge("w-full", className),
        ...props,
        children: [
          title && /* @__PURE__ */ jsx("h2", { className: "mb-4 text-lg font-semibold text-gray-900 dark:text-slate-50", children: title }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: merge("grid gap-5", gridCols),
              children: loading ? Array.from({ length: columns }).map((_, i) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "animate-pulse rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "mb-2 h-4 w-20 rounded bg-[var(--surface-muted)]/80" }),
                    /* @__PURE__ */ jsx("div", { className: "mb-1 h-8 w-24 rounded bg-[var(--surface-muted)]/80" }),
                    /* @__PURE__ */ jsx("div", { className: "h-3 w-32 rounded bg-[var(--surface-muted)]/80" })
                  ]
                },
                i
              )) : items.map((item, index) => {
                var _a, _b, _c, _d, _e;
                return /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: merge(
                      "rounded-xl transition-all duration-200 p-6",
                      accentStyles[(_a = item.accent) != null ? _a : "neutral"].card
                    ),
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-start justify-between gap-4", children: [
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: merge(
                              "text-sm font-medium",
                              accentStyles[(_b = item.accent) != null ? _b : "neutral"].label
                            ),
                            children: item.label
                          }
                        ),
                        item.icon && /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: merge(
                              "inline-flex h-10 w-10 items-center justify-center rounded-xl text-base font-semibold",
                              accentStyles[(_c = item.accent) != null ? _c : "neutral"].iconWrapper,
                              accentStyles[(_d = item.accent) != null ? _d : "neutral"].icon
                            ),
                            children: item.icon
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: merge(
                            "text-2xl font-semibold leading-tight mb-2",
                            accentStyles[(_e = item.accent) != null ? _e : "neutral"].value
                          ),
                          children: item.value
                        }
                      ),
                      item.description && /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs text-gray-500 dark:text-slate-400", children: item.description }),
                      item.trend && item.trendValue && /* @__PURE__ */ jsxs(
                        "div",
                        {
                          className: merge(
                            "mt-2 flex items-center gap-1 text-xs",
                            item.trend === "up" ? "text-green-600 dark:text-green-400" : item.trend === "down" ? "text-red-600 dark:text-red-400" : "text-gray-500 dark:text-slate-400"
                          ),
                          children: [
                            item.trend === "up" && "\u2191",
                            item.trend === "down" && "\u2193",
                            item.trendValue
                          ]
                        }
                      )
                    ]
                  },
                  index
                );
              })
            }
          )
        ]
      }
    );
  }
);
StatsPanel.displayName = "StatsPanel";
var SectionHeader = React61__default.forwardRef(
  ({
    title,
    description,
    action,
    className,
    ...props
  }, ref) => {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: merge(
          "flex items-center justify-between border-b border-gray-100 bg-transparent px-6 py-4 text-gray-900 dark:border-slate-800 dark:text-slate-50",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold text-inherit", children: title }),
            description && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500 dark:text-slate-400", children: description })
          ] }),
          action && /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 ml-4", children: action })
        ]
      }
    );
  }
);
SectionHeader.displayName = "SectionHeader";
var Navigation3 = React61__default.forwardRef(
  ({
    className,
    value,
    defaultValue,
    onValueChange,
    variant = "pills",
    scale = "medium",
    children,
    ...props
  }, ref) => {
    const [activeTab, setActiveTab] = React61__default.useState(value || defaultValue || "");
    const isControlled = value !== void 0;
    const currentValue = isControlled ? value : activeTab;
    React61__default.useEffect(() => {
      if (value !== void 0) {
        setActiveTab(value);
      }
    }, [value]);
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: merge(
          "w-full",
          className
        ),
        ...props,
        children: React61__default.Children.map(children, (child) => {
          if (React61__default.isValidElement(child)) {
            return React61__default.cloneElement(child, {
              value: currentValue,
              variant,
              scale
            });
          }
          return child;
        })
      }
    );
  }
);
Navigation3.displayName = "Navigation";
var NavigationList = React61__default.forwardRef(
  ({
    className,
    value,
    onValueChange,
    variant = "pills",
    scale = "medium",
    children,
    ...props
  }, ref) => {
    const getStyleClasses = () => {
      switch (variant) {
        case "pills":
          return "bg-slate-100 dark:bg-slate-800 p-1 rounded-xl";
        case "underline":
          return "border-b border-slate-200 dark:border-slate-700";
        case "cards":
          return "bg-slate-50 dark:bg-slate-900 p-1 rounded-xl";
        default:
          return "bg-slate-100 dark:bg-slate-800 p-1 rounded-xl";
      }
    };
    const getScaleClasses = () => {
      switch (scale) {
        case "small":
          return "gap-1";
        case "large":
          return "gap-3";
        default:
          return "gap-2";
      }
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: merge(
          "flex",
          getStyleClasses(),
          getScaleClasses(),
          className
        ),
        ...props,
        children: React61__default.Children.map(children, (child) => {
          if (React61__default.isValidElement(child)) {
            return React61__default.cloneElement(child, {
              value,
              variant,
              scale
            });
          }
          return child;
        })
      }
    );
  }
);
NavigationList.displayName = "NavigationList";
var NavigationItem = React61__default.forwardRef(
  ({
    className,
    value,
    onValueChange,
    variant = "pills",
    scale = "medium",
    active = false,
    children,
    ...props
  }, ref) => {
    const getStyleClasses = () => {
      switch (variant) {
        case "pills":
          return merge(
            "rounded-lg px-3 py-2 text-sm font-medium transition-all",
            active ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
          );
        case "underline":
          return merge(
            "border-b-2 px-3 py-2 text-sm font-medium transition-all",
            active ? "border-blue-500 text-blue-600 dark:text-blue-400" : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
          );
        case "cards":
          return merge(
            "rounded-lg px-3 py-2 text-sm font-medium transition-all",
            active ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm border border-slate-200 dark:border-slate-700" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
          );
        default:
          return merge(
            "rounded-lg px-3 py-2 text-sm font-medium transition-all",
            active ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
          );
      }
    };
    const getScaleClasses = () => {
      switch (scale) {
        case "small":
          return "text-xs px-2 py-1";
        case "large":
          return "text-base px-4 py-3";
        default:
          return "text-sm px-3 py-2";
      }
    };
    const handleClick = () => {
      onValueChange == null ? void 0 : onValueChange(value);
    };
    return /* @__PURE__ */ jsx(
      "button",
      {
        ref,
        className: merge(
          getStyleClasses(),
          getScaleClasses(),
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2",
          className
        ),
        onClick: handleClick,
        ...props,
        children
      }
    );
  }
);
NavigationItem.displayName = "NavigationItem";
var NavigationContent = React61__default.forwardRef(
  ({ className, active = false, ...props }, ref) => {
    if (!active) return null;
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: merge("mt-4", className),
        ...props
      }
    );
  }
);
NavigationContent.displayName = "NavigationContent";
var NavigationComponent = Navigation3;
NavigationComponent.List = NavigationList;
NavigationComponent.Item = NavigationItem;
NavigationComponent.Content = NavigationContent;
var Breadcrumb = React61__default.forwardRef(
  ({ className, children, separator = /* @__PURE__ */ jsx(Icon, { name: "chevronRight", className: "w-3 h-3 text-slate-400 dark:text-slate-500 flex-shrink-0" }), variant = "default", ...props }, ref) => {
    const variantStyles = {
      default: "inline-flex items-center text-sm w-fit",
      subtle: "inline-flex items-center text-xs bg-white/40 dark:bg-slate-800/40 backdrop-blur-md rounded-md px-3 py-2 border border-slate-200/30 dark:border-white/20 w-fit shadow-sm",
      transparent: "inline-flex items-center text-xs w-fit",
      glass: "inline-flex items-center text-xs bg-white/30 dark:bg-slate-800/30 backdrop-blur-lg rounded-lg px-4 py-2 border border-slate-200/25 dark:border-white/15 w-fit shadow-lg"
    };
    return /* @__PURE__ */ jsx(
      "nav",
      {
        ref,
        "aria-label": "Breadcrumb",
        className: cn(variantStyles[variant], className),
        ...props,
        children: /* @__PURE__ */ jsx("ol", { className: "inline-flex items-center", children: React61__default.Children.map(children, (child, index) => {
          if (React61__default.isValidElement(child)) {
            return /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
              child,
              index < React61__default.Children.count(children) - 1 && /* @__PURE__ */ jsx("span", { className: "mx-3 text-slate-400 dark:text-slate-500 flex items-center justify-center", "aria-hidden": "true", children: separator })
            ] }, index);
          }
          return child;
        }) })
      }
    );
  }
);
Breadcrumb.displayName = "Breadcrumb";
var BreadcrumbItem = React61__default.forwardRef(
  ({ className, href, isCurrent = false, children, ...props }, ref) => {
    if (isCurrent) {
      return /* @__PURE__ */ jsx(
        "span",
        {
          ref,
          "aria-current": "page",
          className: cn(
            "text-slate-500 dark:text-slate-400 font-medium",
            className
          ),
          ...props,
          children
        }
      );
    }
    if (href) {
      return /* @__PURE__ */ jsx(
        "a",
        {
          href,
          className: cn(
            "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors",
            className
          ),
          ...props,
          children
        }
      );
    }
    return /* @__PURE__ */ jsx(
      "span",
      {
        ref,
        className: cn(
          "text-slate-400 dark:text-slate-500",
          className
        ),
        ...props,
        children
      }
    );
  }
);
BreadcrumbItem.displayName = "BreadcrumbItem";
var Pagination = React61.forwardRef(
  ({
    className,
    currentPage,
    totalPages,
    onPageChange,
    showFirstLast = true,
    showPrevNext = true,
    maxVisiblePages = 5,
    size = "md",
    variant = "default",
    shape = "square",
    ...props
  }, ref) => {
    const getVisiblePages = () => {
      const pages = [];
      const halfVisible = Math.floor(maxVisiblePages / 2);
      let start = Math.max(1, currentPage - halfVisible);
      let end = Math.min(totalPages, currentPage + halfVisible);
      if (end - start + 1 < maxVisiblePages) {
        if (start === 1) {
          end = Math.min(totalPages, start + maxVisiblePages - 1);
        } else {
          start = Math.max(1, end - maxVisiblePages + 1);
        }
      }
      if (start > 1) {
        pages.push(1);
        if (start > 2) {
          pages.push("...");
        }
      }
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (end < totalPages) {
        if (end < totalPages - 1) {
          pages.push("...");
        }
        pages.push(totalPages);
      }
      return pages;
    };
    const getSizeClasses = () => {
      switch (size) {
        case "sm":
          return "h-8 px-2 text-sm";
        // 32px 높이, 8px 패딩
        case "lg":
          return "h-12 px-4 text-base";
        // 48px 높이, 16px 패딩
        default:
          return "h-10 px-3 text-sm";
      }
    };
    const getShapeClasses = () => {
      switch (shape) {
        case "circle":
          return "rounded-full aspect-square flex items-center justify-center";
        default:
          return "rounded-md";
      }
    };
    const getVariantClasses = (isActive = false) => {
      const activeClasses = "bg-brand-primary text-white border-brand-primary shadow-sm";
      const hoverAccent = "hover:border-brand-primary hover:text-brand-primary focus-visible:ring-brand-primary/40";
      switch (variant) {
        case "outlined":
          return cn(
            "border bg-white text-gray-700 transition-colors dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300",
            hoverAccent,
            isActive ? activeClasses : "border-gray-200 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-700"
          );
        case "minimal":
          return cn(
            "border-0 bg-transparent text-gray-600 transition-colors dark:text-gray-300",
            "hover:bg-gray-100 dark:hover:bg-gray-700",
            hoverAccent,
            isActive ? "bg-brand-primary/10 text-brand-primary" : void 0
          );
        default:
          return cn(
            "border border-transparent bg-gray-50 text-gray-700 transition-colors dark:bg-gray-800 dark:text-gray-300",
            hoverAccent,
            isActive ? activeClasses : "hover:bg-white dark:hover:bg-gray-700"
          );
      }
    };
    const handlePageClick = (page) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        onPageChange(page);
      }
    };
    const visiblePages = getVisiblePages();
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: cn(
          "flex items-center justify-center gap-1",
          className
        ),
        ...props,
        children: [
          showFirstLast && currentPage > 1 && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handlePageClick(1),
              className: cn(
                "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                getSizeClasses(),
                getShapeClasses(),
                getVariantClasses()
              ),
              "aria-label": "\uCCAB \uD398\uC774\uC9C0\uB85C \uC774\uB3D9",
              children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M11 19l-7-7 7-7M19 19l-7-7 7-7" }) })
            }
          ),
          showPrevNext && currentPage > 1 && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handlePageClick(currentPage - 1),
              className: cn(
                "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                getSizeClasses(),
                getShapeClasses(),
                getVariantClasses()
              ),
              "aria-label": "\uC774\uC804 \uD398\uC774\uC9C0\uB85C \uC774\uB3D9",
              children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) })
            }
          ),
          visiblePages.map((page, index) => /* @__PURE__ */ jsx(React61.Fragment, { children: page === "..." ? /* @__PURE__ */ jsx("span", { className: cn(
            "inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400",
            getSizeClasses()
          ), children: "..." }) : /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handlePageClick(page),
              className: cn(
                "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                getSizeClasses(),
                getShapeClasses(),
                getVariantClasses(page === currentPage)
              ),
              "aria-label": `${page}\uD398\uC774\uC9C0\uB85C \uC774\uB3D9`,
              "aria-current": page === currentPage ? "page" : void 0,
              children: page
            }
          ) }, index)),
          showPrevNext && currentPage < totalPages && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handlePageClick(currentPage + 1),
              className: cn(
                "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                getSizeClasses(),
                getShapeClasses(),
                getVariantClasses()
              ),
              "aria-label": "\uB2E4\uC74C \uD398\uC774\uC9C0\uB85C \uC774\uB3D9",
              children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
            }
          ),
          showFirstLast && currentPage < totalPages && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handlePageClick(totalPages),
              className: cn(
                "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                getSizeClasses(),
                getShapeClasses(),
                getVariantClasses()
              ),
              "aria-label": "\uB9C8\uC9C0\uB9C9 \uD398\uC774\uC9C0\uB85C \uC774\uB3D9",
              children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 5l7 7-7 7M5 5l7 7-7 7" }) })
            }
          )
        ]
      }
    );
  }
);
Pagination.displayName = "Pagination";
var PaginationOutlined = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(Pagination, { ref, variant: "outlined", className, ...props })
);
PaginationOutlined.displayName = "PaginationOutlined";
var PaginationMinimal = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(Pagination, { ref, variant: "minimal", className, ...props })
);
PaginationMinimal.displayName = "PaginationMinimal";
var PaginationWithInfo = React61.forwardRef(
  ({
    totalItems = 0,
    itemsPerPage = 10,
    showInfo = true,
    className,
    ...props
  }, ref) => {
    const startItem = (props.currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(props.currentPage * itemsPerPage, totalItems);
    return /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col sm:flex-row items-center justify-between gap-4", className), children: [
      showInfo && /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-700 dark:text-gray-300", children: totalItems > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: startItem }),
        " - ",
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: endItem }),
        " of ",
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: totalItems }),
        " results"
      ] }) : "No results" }),
      /* @__PURE__ */ jsx(Pagination, { ref, ...props })
    ] });
  }
);
PaginationWithInfo.displayName = "PaginationWithInfo";
var PageNavigation = React61__default.forwardRef(
  ({
    className,
    prevPage,
    nextPage,
    showOnMobile = false,
    ...props
  }, ref) => {
    if (!prevPage && !nextPage) {
      return null;
    }
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: cn(
          "flex items-center justify-between py-4",
          !showOnMobile && "hidden md:flex",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex-1", children: prevPage && /* @__PURE__ */ jsxs(
            "a",
            {
              href: prevPage.href,
              className: "group inline-flex items-center text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors",
              children: [
                /* @__PURE__ */ jsx(
                  Icon,
                  {
                    name: "chevronLeft",
                    className: "w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: prevPage.title })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 flex justify-end", children: nextPage && /* @__PURE__ */ jsxs(
            "a",
            {
              href: nextPage.href,
              className: "group inline-flex items-center text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors",
              children: [
                /* @__PURE__ */ jsx("span", { className: "hidden sm:inline mr-2", children: nextPage.title }),
                /* @__PURE__ */ jsx(
                  Icon,
                  {
                    name: "chevronRight",
                    className: "w-4 h-4 transition-transform group-hover:translate-x-1"
                  }
                )
              ]
            }
          ) })
        ]
      }
    );
  }
);
PageNavigation.displayName = "PageNavigation";
function LoadingSpinner({
  className,
  size = "md",
  variant = "default",
  text,
  color = "default"
}) {
  const sizeClasses2 = {
    sm: "w-6 h-6",
    // 24px - 더 넉넉한 크기
    md: "w-8 h-8",
    // 32px - 더 넉넉한 크기
    lg: "w-12 h-12",
    // 48px - 더 넉넉한 크기
    xl: "w-16 h-16"
    // 64px - 더 넉넉한 크기
  };
  const colorClasses5 = {
    default: "border-gray-300 border-t-gray-600 dark:border-gray-600 dark:border-t-gray-300",
    primary: "border-blue-300 border-t-blue-600 dark:border-blue-600 dark:border-t-blue-300",
    secondary: "border-gray-300 border-t-gray-600 dark:border-gray-600 dark:border-t-gray-300",
    success: "border-green-300 border-t-green-600 dark:border-green-600 dark:border-t-green-300",
    warning: "border-yellow-300 border-t-yellow-600 dark:border-yellow-600 dark:border-t-yellow-300",
    error: "border-red-300 border-t-red-600 dark:border-red-600 dark:border-t-red-300",
    glass: "border-white/30 border-t-white/50 dark:border-slate-600/50 dark:border-t-slate-400/50"
  };
  const renderSpinner = () => {
    switch (variant) {
      case "dots":
        return /* @__PURE__ */ jsxs("div", { className: "flex space-x-1", children: [
          /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-current rounded-full animate-bounce" }),
          /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-current rounded-full animate-bounce delay-100" }),
          /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-current rounded-full animate-bounce delay-200" })
        ] });
      case "bars":
        return /* @__PURE__ */ jsxs("div", { className: "flex space-x-1 h-full items-end", children: [
          /* @__PURE__ */ jsx("div", { className: "w-1 bg-current animate-pulse", style: { height: "60%" } }),
          /* @__PURE__ */ jsx("div", { className: "w-1 bg-current animate-pulse delay-100", style: { height: "80%" } }),
          /* @__PURE__ */ jsx("div", { className: "w-1 bg-current animate-pulse delay-200", style: { height: "40%" } }),
          /* @__PURE__ */ jsx("div", { className: "w-1 bg-current animate-pulse delay-300", style: { height: "100%" } }),
          /* @__PURE__ */ jsx("div", { className: "w-1 bg-current animate-pulse delay-500", style: { height: "70%" } })
        ] });
      case "ring":
        return /* @__PURE__ */ jsx("div", { className: cn(
          "animate-spin rounded-full border-2",
          colorClasses5[color]
        ) });
      case "ripple":
        return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("div", { className: cn(
            "absolute inset-0 rounded-full border-2 animate-ping",
            colorClasses5[color]
          ) }),
          /* @__PURE__ */ jsx("div", { className: cn(
            "rounded-full border-2",
            colorClasses5[color]
          ) })
        ] });
      default:
        return /* @__PURE__ */ jsx("div", { className: cn(
          "animate-spin rounded-full border-2",
          colorClasses5[color]
        ) });
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col items-center justify-center", className), children: [
    /* @__PURE__ */ jsx("div", { className: cn(sizeClasses2[size], "text-gray-600 dark:text-gray-400"), children: renderSpinner() }),
    text && /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-gray-600 dark:text-gray-400 text-center", children: text })
  ] });
}
var PageTransition = React61__default.forwardRef(({
  children,
  className,
  duration = 300,
  variant = "fade",
  loadingVariant = "ripple",
  loadingText = "\uD398\uC774\uC9C0 \uB85C\uB529 \uC911...",
  showLoading = true,
  onTransitionStart,
  onTransitionEnd
}, ref) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsVisible(true);
      onTransitionEnd == null ? void 0 : onTransitionEnd();
    }, duration);
    onTransitionStart == null ? void 0 : onTransitionStart();
    return () => clearTimeout(timer);
  }, [duration, onTransitionStart, onTransitionEnd]);
  const transitionClasses = {
    fade: cn(
      "transition-opacity duration-300 ease-in-out",
      isVisible ? "opacity-100" : "opacity-0"
    ),
    slide: cn(
      "transition-transform duration-300 ease-in-out",
      isVisible ? "translate-x-0" : "translate-x-full"
    ),
    scale: cn(
      "transition-all duration-300 ease-in-out",
      isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
    ),
    flip: cn(
      "transition-all duration-500 ease-in-out",
      isVisible ? "rotate-y-0 opacity-100" : "rotate-y-90 opacity-0"
    )
  };
  if (isLoading && showLoading) {
    return /* @__PURE__ */ jsx("div", { className: cn("flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800", className), children: /* @__PURE__ */ jsx(
      LoadingSpinner,
      {
        size: "lg",
        variant: loadingVariant,
        text: loadingText
      }
    ) });
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn(
        "w-full",
        transitionClasses[variant],
        className
      ),
      style: { transitionDuration: `${duration}ms` },
      children
    }
  );
});
PageTransition.displayName = "PageTransition";
var FadeTransition = React61__default.forwardRef((props, ref) => /* @__PURE__ */ jsx(PageTransition, { ref, variant: "fade", ...props }));
var SlideTransition = React61__default.forwardRef((props, ref) => /* @__PURE__ */ jsx(PageTransition, { ref, variant: "slide", ...props }));
var ScaleTransition = React61__default.forwardRef((props, ref) => /* @__PURE__ */ jsx(PageTransition, { ref, variant: "scale", ...props }));
var FlipTransition = React61__default.forwardRef((props, ref) => /* @__PURE__ */ jsx(PageTransition, { ref, variant: "flip", ...props }));
FadeTransition.displayName = "FadeTransition";
SlideTransition.displayName = "SlideTransition";
ScaleTransition.displayName = "ScaleTransition";
FlipTransition.displayName = "FlipTransition";
function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = React61__default.useState(false);
  React61__default.useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}
var DashboardSidebar = React61__default.forwardRef(
  ({
    sections,
    isCollapsed = false,
    onToggleCollapsed,
    collapsedWidth = 72,
    expandedWidth = 264,
    mobileBreakpoint = 1024,
    logo,
    footer,
    className,
    ...props
  }, ref) => {
    const isMobile = useIsMobile(mobileBreakpoint);
    const [hoveredId, setHoveredId] = React61__default.useState(null);
    const favoriteItems = React61__default.useMemo(() => {
      const collected = [];
      const seen = /* @__PURE__ */ new Set();
      sections.forEach((section) => {
        section.items.forEach((item) => {
          if (!seen.has(item.id)) {
            seen.add(item.id);
            collected.push(item);
          }
        });
      });
      return collected.slice(0, 5);
    }, [sections]);
    const width = isCollapsed ? collapsedWidth : expandedWidth;
    const handleClose = () => {
      onToggleCollapsed == null ? void 0 : onToggleCollapsed();
    };
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      isMobile && !isCollapsed && /* @__PURE__ */ jsx(
        "div",
        {
          className: "fixed inset-0 z-30",
          style: { backgroundColor: "rgba(0, 0, 0, 0.3)" },
          onClick: handleClose
        }
      ),
      isCollapsed && onToggleCollapsed && !isMobile && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onToggleCollapsed,
          className: "fixed left-2 top-4 z-50 w-8 h-8 bg-white border border-gray-200 rounded-md shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center",
          "aria-label": "Expand sidebar",
          title: "\uC0AC\uC774\uB4DC\uBC14 \uC5F4\uAE30",
          children: /* @__PURE__ */ jsx(
            "svg",
            {
              className: "w-4 h-4 text-gray-700",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M9 5l7 7-7 7"
                }
              )
            }
          )
        }
      ),
      /* @__PURE__ */ jsxs(
        "aside",
        {
          ref,
          className: merge(
            "flex flex-col h-screen bg-white border-r border-gray-100 transition-all duration-300",
            isMobile ? "fixed left-0 top-0 z-40 shadow-lg" : "relative",
            className
          ),
          style: { width: isMobile && !isCollapsed ? "80vw" : `${width}px`, maxWidth: isMobile ? 400 : void 0 },
          ...props,
          children: [
            logo && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-gray-100 flex-shrink-0 p-4", children: [
              !isCollapsed && /* @__PURE__ */ jsx("div", { className: "flex-1", children: logo }),
              onToggleCollapsed && !isCollapsed && /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: onToggleCollapsed,
                  className: "rounded-sm transition-colors flex-shrink-0 p-1.5 hover:bg-gray-100",
                  "aria-label": "Collapse sidebar",
                  title: "\uC0AC\uC774\uB4DC\uBC14 \uB2EB\uAE30",
                  children: /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: "w-4 h-4 text-gray-600",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: 2,
                          d: "M15 19l-7-7 7-7"
                        }
                      )
                    }
                  )
                }
              )
            ] }),
            isCollapsed && favoriteItems.length > 0 && /* @__PURE__ */ jsxs("div", { className: "border-b border-gray-100 px-2.5 pt-4 pb-3 flex flex-col items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.3em] text-gray-400", children: "Favorites" }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2 w-full items-center", children: favoriteItems.map((item) => {
                var _a, _b;
                const iconNode = /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0052CC] to-[#00C897] text-white flex items-center justify-center shadow-md", children: item.icon ? /* @__PURE__ */ jsx("span", { className: "text-white", children: item.icon }) : /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold", children: ((_b = (_a = item.label) == null ? void 0 : _a[0]) != null ? _b : "\u2022").toUpperCase() }) });
                if (item.href) {
                  return /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: item.href,
                      className: "flex flex-col items-center gap-1 text-xs text-gray-500 no-underline",
                      title: item.label,
                      children: [
                        iconNode,
                        /* @__PURE__ */ jsx("span", { className: "sr-only", children: item.label })
                      ]
                    },
                    `fav-${item.id}`
                  );
                }
                return /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "flex flex-col items-center gap-1 text-xs text-gray-500",
                    title: item.label,
                    children: [
                      iconNode,
                      /* @__PURE__ */ jsx("span", { className: "sr-only", children: item.label })
                    ]
                  },
                  `fav-${item.id}`
                );
              }) })
            ] }),
            /* @__PURE__ */ jsx(
              "nav",
              {
                className: "flex-1 overflow-y-auto px-4 py-6",
                children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4", children: sections.map((section, sectionIndex) => /* @__PURE__ */ jsxs("div", { children: [
                  sectionIndex > 0 && /* @__PURE__ */ jsx("div", { className: "border-t border-gray-200 mb-4 mt-2" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2.5", children: [
                    !isCollapsed && /* @__PURE__ */ jsx("h3", { className: "text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-3 pl-4", children: section.label }),
                    /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-gray-100 overflow-hidden bg-white/90 dark:bg-gray-900/70", children: section.items.map((item) => {
                      hoveredId === item.id;
                      const content = /* @__PURE__ */ jsxs(
                        "div",
                        {
                          className: merge(
                            "relative flex items-center text-base font-medium transition-all duration-200 cursor-pointer gap-3 px-4 py-3 border-b border-gray-100 last:border-b-0",
                            isCollapsed && "justify-center px-0",
                            item.active ? "bg-brand-primary/10 text-brand-primary shadow-[inset_0_0_0_1px_rgba(0,82,204,0.15)] font-semibold" : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                          ),
                          onMouseEnter: () => setHoveredId(item.id),
                          onMouseLeave: () => setHoveredId(null),
                          children: [
                            item.active && /* @__PURE__ */ jsx("div", { className: "absolute left-0 top-0 h-full w-1 rounded-r-full bg-brand-primary" }),
                            item.icon && /* @__PURE__ */ jsx(
                              "span",
                              {
                                className: "flex-shrink-0 flex items-center justify-center",
                                style: { width: "20px", height: "20px" },
                                children: item.icon
                              }
                            ),
                            !isCollapsed && /* @__PURE__ */ jsx("span", { className: "flex-1 truncate", children: item.label })
                          ]
                        }
                      );
                      if (item.href) {
                        return /* @__PURE__ */ jsx(
                          "a",
                          {
                            href: item.href,
                            className: "block no-underline",
                            title: isCollapsed ? item.label : void 0,
                            onClick: (e) => {
                            },
                            children: content
                          },
                          item.id
                        );
                      }
                      return /* @__PURE__ */ jsx("div", { title: isCollapsed ? item.label : void 0, children: content }, item.id);
                    }) })
                  ] })
                ] }, section.id)) })
              }
            ),
            footer && /* @__PURE__ */ jsx("div", { className: "border-t border-gray-100 p-4", children: footer })
          ]
        }
      )
    ] });
  }
);
DashboardSidebar.displayName = "DashboardSidebar";
var AdvancedPageTransition = React61__default.forwardRef(({
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
var FadePageTransition = React61__default.forwardRef((props, ref) => /* @__PURE__ */ jsx(AdvancedPageTransition, { ref, type: "fade", ...props }));
var SlidePageTransition = React61__default.forwardRef((props, ref) => /* @__PURE__ */ jsx(AdvancedPageTransition, { ref, type: "slide", ...props }));
var ScalePageTransition = React61__default.forwardRef((props, ref) => /* @__PURE__ */ jsx(AdvancedPageTransition, { ref, type: "scale", ...props }));
var FlipPageTransition = React61__default.forwardRef((props, ref) => /* @__PURE__ */ jsx(AdvancedPageTransition, { ref, type: "flip", ...props }));
var MorphPageTransition = React61__default.forwardRef((props, ref) => /* @__PURE__ */ jsx(AdvancedPageTransition, { ref, type: "morph", ...props }));
var CubePageTransition = React61__default.forwardRef((props, ref) => /* @__PURE__ */ jsx(AdvancedPageTransition, { ref, type: "cube", ...props }));
var ZoomPageTransition = React61__default.forwardRef((props, ref) => /* @__PURE__ */ jsx(AdvancedPageTransition, { ref, type: "zoom", ...props }));
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
var Table = React61.forwardRef(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const getVariantClasses = () => {
      switch (variant) {
        case "bordered":
          return "border border-slate-200 dark:border-slate-700 divide-x divide-slate-200 dark:divide-slate-700";
        case "striped":
          return "divide-y divide-slate-200 dark:divide-slate-700";
        default:
          return "";
      }
    };
    const getSizeClasses = () => {
      switch (size) {
        case "sm":
          return "text-sm";
        case "lg":
          return "text-base";
        default:
          return "text-sm";
      }
    };
    return /* @__PURE__ */ jsx("div", { className: "w-full overflow-auto", children: /* @__PURE__ */ jsx(
      "table",
      {
        ref,
        className: cn(
          "w-full caption-bottom",
          getVariantClasses(),
          getSizeClasses(),
          className
        ),
        ...props
      }
    ) });
  }
);
Table.displayName = "Table";
var TableHeader = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props })
);
TableHeader.displayName = "TableHeader";
var TableBody = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "tbody",
    {
      ref,
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  )
);
TableBody.displayName = "TableBody";
var TableFooter = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "tfoot",
    {
      ref,
      className: cn(
        "border-t bg-slate-50 dark:bg-slate-800/50 font-medium [&>tr]:last:border-b-0",
        className
      ),
      ...props
    }
  )
);
TableFooter.displayName = "TableFooter";
var TableRow = React61.forwardRef(
  ({ className, variant = "default", ...props }, ref) => {
    const getVariantClasses = () => {
      switch (variant) {
        case "hover":
          return "hover:bg-slate-50 dark:hover:bg-slate-800/50";
        default:
          return "";
      }
    };
    return /* @__PURE__ */ jsx(
      "tr",
      {
        ref,
        className: cn(
          "border-b transition-colors data-[state=selected]:bg-slate-50 dark:data-[state=selected]:bg-slate-800/50",
          getVariantClasses(),
          className
        ),
        ...props
      }
    );
  }
);
TableRow.displayName = "TableRow";
var TableHead = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "th",
    {
      ref,
      className: cn(
        "h-12 px-4 text-left align-middle font-medium text-slate-500 dark:text-slate-400 [&:has([role=checkbox])]:pr-0",
        className
      ),
      ...props
    }
  )
);
TableHead.displayName = "TableHead";
var TableCell = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "td",
    {
      ref,
      className: cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className),
      ...props
    }
  )
);
TableCell.displayName = "TableCell";
var TableCaption = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "caption",
    {
      ref,
      className: cn("mt-4 text-sm text-slate-500 dark:text-slate-400", className),
      ...props
    }
  )
);
TableCaption.displayName = "TableCaption";
var Badge = React61__default.forwardRef(
  ({ className, variant = "default", ...props }, ref) => {
    const variantClasses = {
      default: "bg-slate-900 text-slate-50 hover:bg-slate-900/80 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/80",
      secondary: "bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
      destructive: "bg-red-500 text-slate-50 hover:bg-red-500/80 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/80",
      outline: "text-slate-950 border border-slate-200 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:text-slate-50 dark:hover:bg-slate-800 dark:hover:text-slate-50",
      glass: "bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 dark:bg-slate-800/20 dark:border-slate-700/50 dark:text-slate-200 dark:hover:bg-slate-700/30"
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2",
          variantClasses[variant],
          className
        ),
        ...props
      }
    );
  }
);
Badge.displayName = "Badge";
var Progress = React61.forwardRef(
  ({
    className,
    value = 0,
    max = 100,
    size = "md",
    variant = "default",
    showValue = false,
    animated = true,
    striped = false,
    label,
    description,
    ...props
  }, ref) => {
    const percentage = Math.min(Math.max(value / max * 100, 0), 100);
    const sizeClasses2 = {
      sm: "h-2",
      // 8px 높이
      md: "h-3",
      // 12px 높이
      lg: "h-4"
      // 16px 높이
    };
    const getVariantClasses = () => {
      switch (variant) {
        case "success":
          return "bg-green-500 dark:bg-green-400";
        case "warning":
          return "bg-yellow-500 dark:bg-yellow-400";
        case "error":
          return "bg-red-500 dark:bg-red-400";
        case "info":
          return "bg-blue-500 dark:bg-blue-400";
        case "glass":
          return "bg-white/50 backdrop-blur-sm";
        default:
          return "bg-gray-900 dark:bg-gray-100";
      }
    };
    const getStripedClasses = () => {
      if (!striped) return "";
      return "bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:20px_100%] animate-pulse";
    };
    return /* @__PURE__ */ jsxs("div", { className: cn("w-full", className), ...props, children: [
      (label || showValue) && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        " ",
        label && /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: label }),
        showValue && /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-600 dark:text-gray-400", children: [
          Math.round(percentage),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "div",
        {
          ref,
          className: cn(
            "relative w-full overflow-hidden rounded-full",
            variant === "glass" ? "bg-white/10 backdrop-blur-sm border border-white/20 dark:bg-slate-800/10 dark:border-slate-700/50" : "bg-gray-200 dark:bg-gray-700",
            sizeClasses2[size]
          ),
          children: /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "h-full rounded-full transition-all duration-300 ease-out",
                getVariantClasses(),
                getStripedClasses(),
                animated && "animate-pulse"
              ),
              style: {
                width: `${percentage}%`,
                transition: animated ? "width 0.3s ease-out" : "none"
              }
            }
          )
        }
      ),
      description && /* @__PURE__ */ jsxs("p", { className: "mt-2 text-xs text-gray-500 dark:text-gray-400", children: [
        " ",
        description
      ] })
    ] });
  }
);
Progress.displayName = "Progress";
var ProgressSuccess = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(Progress, { ref, variant: "success", className, ...props })
);
ProgressSuccess.displayName = "ProgressSuccess";
var ProgressWarning = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(Progress, { ref, variant: "warning", className, ...props })
);
ProgressWarning.displayName = "ProgressWarning";
var ProgressError = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(Progress, { ref, variant: "error", className, ...props })
);
ProgressError.displayName = "ProgressError";
var ProgressInfo = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(Progress, { ref, variant: "info", className, ...props })
);
ProgressInfo.displayName = "ProgressInfo";
var ProgressWrapper = React61.forwardRef(
  ({ title, className, ...props }, ref) => /* @__PURE__ */ jsxs("div", { className: cn("p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700", className), children: [
    title && /* @__PURE__ */ jsxs("h3", { className: "text-sm font-semibold text-gray-900 dark:text-white mb-3", children: [
      " ",
      title
    ] }),
    /* @__PURE__ */ jsx(Progress, { ref, ...props })
  ] })
);
ProgressWrapper.displayName = "ProgressWrapper";
var ProgressGroup = React61.forwardRef(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("space-y-4", className),
      ...props,
      children
    }
  )
);
ProgressGroup.displayName = "ProgressGroup";
var Skeleton = React61.forwardRef(
  ({
    className,
    variant = "text",
    width,
    height,
    animation = "pulse",
    ...props
  }, ref) => {
    const getVariantClasses = () => {
      switch (variant) {
        case "circular":
          return "rounded-full";
        case "rounded":
          return "rounded-lg";
        case "rectangular":
          return "rounded-none";
        case "text":
        default:
          return "rounded";
      }
    };
    const getAnimationClasses = () => {
      switch (animation) {
        case "wave":
          return "animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer";
        case "shimmer":
          return "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer";
        case "pulse":
        default:
          return "animate-pulse bg-gray-200 dark:bg-gray-700";
      }
    };
    const getDefaultDimensions = () => {
      switch (variant) {
        case "circular":
          return { width: "40px", height: "40px" };
        case "text":
          return { width: "100%", height: "1em" };
        case "rounded":
          return { width: "100%", height: "200px" };
        case "rectangular":
          return { width: "100%", height: "200px" };
        default:
          return { width: "100%", height: "1em" };
      }
    };
    const defaultDims = getDefaultDimensions();
    const finalWidth = width || defaultDims.width;
    const finalHeight = height || defaultDims.height;
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          "block",
          getVariantClasses(),
          getAnimationClasses(),
          className
        ),
        style: {
          width: typeof finalWidth === "number" ? `${finalWidth}px` : finalWidth,
          height: typeof finalHeight === "number" ? `${finalHeight}px` : finalHeight
        },
        ...props
      }
    );
  }
);
Skeleton.displayName = "Skeleton";
var SkeletonText = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(Skeleton, { ref, variant: "text", className, ...props })
);
SkeletonText.displayName = "SkeletonText";
var SkeletonCircle = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(Skeleton, { ref, variant: "circular", className, ...props })
);
SkeletonCircle.displayName = "SkeletonCircle";
var SkeletonRectangle = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(Skeleton, { ref, variant: "rectangular", className, ...props })
);
SkeletonRectangle.displayName = "SkeletonRectangle";
var SkeletonRounded = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(Skeleton, { ref, variant: "rounded", className, ...props })
);
SkeletonRounded.displayName = "SkeletonRounded";
var SkeletonCard = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cn("space-y-4 p-6", className),
      ...props,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
          " ",
          /* @__PURE__ */ jsx(SkeletonCircle, { className: "w-12 h-12" }),
          " ",
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 flex-1", children: [
            " ",
            /* @__PURE__ */ jsx(SkeletonText, { className: "h-4 w-3/4" }),
            " ",
            /* @__PURE__ */ jsx(SkeletonText, { className: "h-3 w-1/2" }),
            " "
          ] })
        ] }),
        /* @__PURE__ */ jsx(SkeletonRounded, { className: "w-full h-32" }),
        " ",
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          " ",
          /* @__PURE__ */ jsx(SkeletonText, { className: "h-4 w-full" }),
          /* @__PURE__ */ jsx(SkeletonText, { className: "h-4 w-5/6" }),
          /* @__PURE__ */ jsx(SkeletonText, { className: "h-4 w-4/6" })
        ] })
      ]
    }
  )
);
SkeletonCard.displayName = "SkeletonCard";
var SkeletonAvatar = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cn("flex items-center space-x-4", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(SkeletonCircle, { className: "w-12 h-12" }),
        " ",
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 flex-1", children: [
          " ",
          /* @__PURE__ */ jsx(SkeletonText, { className: "h-4 w-3/4" }),
          /* @__PURE__ */ jsx(SkeletonText, { className: "h-3 w-1/2" })
        ] })
      ]
    }
  )
);
SkeletonAvatar.displayName = "SkeletonAvatar";
var SkeletonImage = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cn("space-y-2", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(SkeletonRounded, { className: "w-full h-48" }),
        " ",
        /* @__PURE__ */ jsx(SkeletonText, { className: "h-4 w-1/2" })
      ]
    }
  )
);
SkeletonImage.displayName = "SkeletonImage";
var SkeletonUserProfile = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cn("space-y-4", className),
      ...props,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
          " ",
          /* @__PURE__ */ jsx(SkeletonCircle, { className: "w-16 h-16" }),
          " ",
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 flex-1", children: [
            " ",
            /* @__PURE__ */ jsx(SkeletonText, { className: "h-5 w-1/2" }),
            /* @__PURE__ */ jsx(SkeletonText, { className: "h-3 w-1/3" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          " ",
          /* @__PURE__ */ jsx(SkeletonText, { className: "h-4 w-full" }),
          /* @__PURE__ */ jsx(SkeletonText, { className: "h-4 w-5/6" })
        ] })
      ]
    }
  )
);
SkeletonUserProfile.displayName = "SkeletonUserProfile";
var SkeletonList = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("space-y-4", className),
      ...props,
      children: Array.from({ length: 3 }).map((_, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
        " ",
        /* @__PURE__ */ jsx(SkeletonCircle, { className: "w-10 h-10" }),
        " ",
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 flex-1", children: [
          " ",
          /* @__PURE__ */ jsx(SkeletonText, { className: "h-4 w-3/4" }),
          /* @__PURE__ */ jsx(SkeletonText, { className: "h-3 w-1/2" })
        ] })
      ] }, index))
    }
  )
);
SkeletonList.displayName = "SkeletonList";
var SkeletonTable = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cn("space-y-4", className),
      ...props,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-4", children: [
          " ",
          /* @__PURE__ */ jsx(SkeletonText, { className: "h-4 w-1/4" }),
          /* @__PURE__ */ jsx(SkeletonText, { className: "h-4 w-1/4" }),
          /* @__PURE__ */ jsx(SkeletonText, { className: "h-4 w-1/4" }),
          /* @__PURE__ */ jsx(SkeletonText, { className: "h-4 w-1/4" })
        ] }),
        Array.from({ length: 5 }).map((_, index) => /* @__PURE__ */ jsxs("div", { className: "flex space-x-4", children: [
          " ",
          /* @__PURE__ */ jsx(SkeletonText, { className: "h-4 w-1/4" }),
          /* @__PURE__ */ jsx(SkeletonText, { className: "h-4 w-1/4" }),
          /* @__PURE__ */ jsx(SkeletonText, { className: "h-4 w-1/4" }),
          /* @__PURE__ */ jsx(SkeletonText, { className: "h-4 w-1/4" })
        ] }, index))
      ]
    }
  )
);
SkeletonTable.displayName = "SkeletonTable";
var Alert = React61__default.forwardRef(
  ({
    className,
    variant = "default",
    title,
    description,
    icon,
    action,
    closable = false,
    onClose,
    children,
    ...props
  }, ref) => {
    const getVariantClasses = () => {
      switch (variant) {
        case "success":
          return "bg-green-500/10 backdrop-blur-sm border-green-400/30 text-green-200 dark:bg-green-500/10 dark:border-green-400/30 dark:text-green-200";
        case "warning":
          return "bg-yellow-500/10 backdrop-blur-sm border-yellow-400/30 text-yellow-200 dark:bg-yellow-500/10 dark:border-yellow-400/30 dark:text-yellow-200";
        case "error":
          return "bg-red-500/10 backdrop-blur-sm border-red-400/30 text-red-200 dark:bg-red-500/10 dark:border-red-400/30 dark:text-red-200";
        case "info":
          return "bg-blue-500/10 backdrop-blur-sm border-blue-400/30 text-blue-200 dark:bg-blue-500/10 dark:border-blue-400/30 dark:text-blue-200";
        default:
          return "bg-white/10 backdrop-blur-sm border-white/30 text-white dark:bg-slate-800/20 dark:border-slate-700/50 dark:text-slate-200";
      }
    };
    const getIconClasses = () => {
      switch (variant) {
        case "success":
          return "text-green-500 dark:text-green-400";
        case "warning":
          return "text-yellow-500 dark:text-yellow-400";
        case "error":
          return "text-red-500 dark:text-red-400";
        case "info":
          return "text-blue-500 dark:text-blue-400";
        default:
          return "text-gray-500 dark:text-gray-400";
      }
    };
    const getDefaultIcon = () => {
      switch (variant) {
        case "success":
          return /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) });
        case "warning":
          return /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" }) });
        case "error":
          return /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) });
        case "info":
          return /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) });
        default:
          return null;
      }
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          "relative rounded-lg border p-4",
          // 16px 패딩
          getVariantClasses(),
          className
        ),
        ...props,
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
          " ",
          (icon || getDefaultIcon()) && /* @__PURE__ */ jsx("div", { className: cn("flex-shrink-0 mt-0.5", getIconClasses()), children: icon || getDefaultIcon() }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            title && /* @__PURE__ */ jsxs("h4", { className: "text-sm font-semibold mb-1", children: [
              " ",
              title
            ] }),
            description && /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed", children: description }),
            children && /* @__PURE__ */ jsxs("div", { className: "mt-2", children: [
              " ",
              children
            ] })
          ] }),
          (action || closable) && /* @__PURE__ */ jsxs("div", { className: "flex-shrink-0 flex items-center gap-2", children: [
            " ",
            action,
            closable && /* @__PURE__ */ jsx(
              "button",
              {
                onClick: onClose,
                className: cn(
                  "inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/5",
                  getIconClasses()
                ),
                "aria-label": "\uB2EB\uAE30",
                children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
              }
            )
          ] })
        ] })
      }
    );
  }
);
Alert.displayName = "Alert";
var AlertSuccess = React61__default.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(Alert, { ref, variant: "success", className, ...props })
);
AlertSuccess.displayName = "AlertSuccess";
var AlertWarning = React61__default.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(Alert, { ref, variant: "warning", className, ...props })
);
AlertWarning.displayName = "AlertWarning";
var AlertError = React61__default.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(Alert, { ref, variant: "error", className, ...props })
);
AlertError.displayName = "AlertError";
var AlertInfo = React61__default.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(Alert, { ref, variant: "info", className, ...props })
);
AlertInfo.displayName = "AlertInfo";
var ToastContext = createContext(void 0);
function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
function ToastProvider({
  children,
  maxToasts = 5,
  position = "top-right"
}) {
  const [toasts, setToasts] = useState([]);
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);
  const addToast = useCallback((toast) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    setToasts((prev) => {
      const updatedToasts = [...prev, newToast];
      return updatedToasts.slice(-maxToasts);
    });
    if (toast.duration !== 0) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 5e3);
    }
  }, [maxToasts, removeToast]);
  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);
  return /* @__PURE__ */ jsxs(ToastContext.Provider, { value: { toasts, addToast, removeToast, clearToasts }, children: [
    children,
    /* @__PURE__ */ jsx(ToastContainer, { toasts, removeToast, position })
  ] });
}
function ToastContainer({ toasts, removeToast, position }) {
  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-center": "top-4 left-1/2 transform -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2"
  };
  if (toasts.length === 0) return null;
  return /* @__PURE__ */ jsx("div", { className: cn(
    "fixed z-50 space-y-3 max-w-sm",
    // 12px 간격
    positionClasses[position]
  ), children: toasts.map((toast) => /* @__PURE__ */ jsx(ToastItem, { toast, onRemove: removeToast }, toast.id)) });
}
function ToastItem({ toast, onRemove }) {
  const [isVisible, setIsVisible] = useState(false);
  React61.useEffect(() => {
    setIsVisible(true);
  }, []);
  const handleRemove = () => {
    setIsVisible(false);
    setTimeout(() => onRemove(toast.id), 300);
  };
  const getToastStyles = (type) => {
    switch (type) {
      case "success":
        return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200";
      case "error":
        return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200";
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200";
      case "info":
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200";
    }
  };
  const getIconStyles = (type) => {
    switch (type) {
      case "success":
        return "text-green-500 dark:text-green-400";
      case "error":
        return "text-red-500 dark:text-red-400";
      case "warning":
        return "text-yellow-500 dark:text-yellow-400";
      case "info":
        return "text-blue-500 dark:text-blue-400";
    }
  };
  const getToastIcon = (type) => {
    switch (type) {
      case "success":
        return /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) });
      case "error":
        return /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) });
      case "warning":
        return /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" }) });
      case "info":
        return /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) });
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "flex items-start p-4 rounded-xl border shadow-lg backdrop-blur-sm transition-all duration-300 transform",
        getToastStyles(toast.type),
        isVisible ? "translate-x-0 opacity-100 scale-100" : "translate-x-full opacity-0 scale-95"
      ),
      style: {
        animation: "slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
      },
      children: [
        /* @__PURE__ */ jsxs("div", { className: cn("flex-shrink-0 mr-3", getIconStyles(toast.type)), children: [
          " ",
          getToastIcon(toast.type)
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          toast.title && /* @__PURE__ */ jsxs("h4", { className: "text-sm font-semibold mb-1", children: [
            " ",
            toast.title
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed", children: toast.message }),
          toast.action && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: toast.action.onClick,
              className: "mt-3 text-sm font-medium underline hover:no-underline transition-all duration-200",
              children: toast.action.label
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-shrink-0 ml-4", children: [
          " ",
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleRemove,
              className: cn(
                "inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/5",
                getIconStyles(toast.type)
              ),
              "aria-label": "\uB2EB\uAE30",
              children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: {
          __html: `
          @keyframes slideInRight {
            from {
              transform: translateX(100%) scale(0.95);
              opacity: 0;
            }
            to {
              transform: translateX(0) scale(1);
              opacity: 1;
            }
          }
        `
        } })
      ]
    }
  );
}
var Tooltip = React61.forwardRef(
  ({
    className,
    content,
    children,
    position = "top",
    variant = "default",
    delay = 300,
    disabled = false,
    ...props
  }, ref) => {
    const [isVisible, setIsVisible] = React61.useState(false);
    const [coords, setCoords] = React61.useState({ x: 0, y: 0 });
    const timeoutRef = React61.useRef(void 0);
    const tooltipRef = React61.useRef(null);
    const showTooltip = (e) => {
      var _a;
      if (disabled) return;
      const rect = e.currentTarget.getBoundingClientRect();
      (_a = tooltipRef.current) == null ? void 0 : _a.getBoundingClientRect();
      let x = 0;
      let y = 0;
      switch (position) {
        case "top":
          x = rect.left + rect.width / 2;
          y = rect.top - 8;
          break;
        case "bottom":
          x = rect.left + rect.width / 2;
          y = rect.bottom + 8;
          break;
        case "left":
          x = rect.left - 8;
          y = rect.top + rect.height / 2;
          break;
        case "right":
          x = rect.right + 8;
          y = rect.top + rect.height / 2;
          break;
      }
      setCoords({ x, y });
      timeoutRef.current = window.setTimeout(() => {
        setIsVisible(true);
      }, delay);
    };
    const hideTooltip = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsVisible(false);
    };
    React61.useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);
    const getVariantClasses = () => {
      switch (variant) {
        case "light":
          return "bg-white text-gray-900 border border-gray-200 shadow-lg";
        case "dark":
          return "bg-gray-900 text-white shadow-lg";
        default:
          return "bg-gray-800 text-white shadow-lg";
      }
    };
    const getArrowClasses = () => {
      switch (position) {
        case "top":
          return "top-full left-1/2 -translate-x-1/2 border-t-gray-800 dark:border-t-gray-800";
        case "bottom":
          return "bottom-full left-1/2 -translate-x-1/2 border-b-gray-800 dark:border-b-gray-800";
        case "left":
          return "left-full top-1/2 -translate-y-1/2 border-l-gray-800 dark:border-l-gray-800";
        case "right":
          return "right-full top-1/2 -translate-y-1/2 border-r-gray-800 dark:border-r-gray-800";
        default:
          return "top-full left-1/2 -translate-x-1/2 border-t-gray-800 dark:border-t-gray-800";
      }
    };
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: cn("relative inline-block", className),
        onMouseEnter: showTooltip,
        onMouseLeave: hideTooltip,
        ...props,
        children: [
          children,
          isVisible && /* @__PURE__ */ jsxs(
            "div",
            {
              ref: tooltipRef,
              className: cn(
                "fixed z-50 px-3 py-2 text-sm rounded-lg whitespace-nowrap pointer-events-none",
                // 12px, 8px 패딩
                getVariantClasses()
              ),
              style: {
                left: `${coords.x}px`,
                top: `${coords.y}px`,
                transform: "translate(-50%, -50%)"
              },
              children: [
                content,
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: cn(
                      "absolute w-0 h-0 border-4 border-transparent",
                      getArrowClasses()
                    )
                  }
                )
              ]
            }
          )
        ]
      }
    );
  }
);
Tooltip.displayName = "Tooltip";
var TooltipLight = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(Tooltip, { ref, variant: "light", className, ...props })
);
TooltipLight.displayName = "TooltipLight";
var TooltipDark = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(Tooltip, { ref, variant: "dark", className, ...props })
);
TooltipDark.displayName = "TooltipDark";
var Popover = React61.forwardRef(
  ({
    className,
    children,
    trigger,
    open: controlledOpen,
    onOpenChange,
    position = "bottom",
    align = "center",
    offset = 8,
    disabled = false,
    ...props
  }, ref) => {
    const [internalOpen, setInternalOpen] = React61.useState(false);
    const triggerRef = React61.useRef(null);
    const popoverRef = React61.useRef(null);
    const isControlled = controlledOpen !== void 0;
    const isOpen = isControlled ? controlledOpen : internalOpen;
    const handleOpenChange = (newOpen) => {
      if (disabled) return;
      if (!isControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange == null ? void 0 : onOpenChange(newOpen);
    };
    const handleTriggerClick = () => {
      handleOpenChange(!isOpen);
    };
    React61.useEffect(() => {
      const handleClickOutside = (event) => {
        if (triggerRef.current && popoverRef.current && !triggerRef.current.contains(event.target) && !popoverRef.current.contains(event.target)) {
          handleOpenChange(false);
        }
      };
      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }
    }, [isOpen]);
    const getPositionClasses = () => {
      const baseClasses = "absolute z-50";
      switch (position) {
        case "top":
          return cn(baseClasses, "bottom-full left-0", `mb-${Math.max(1, Math.floor(offset / 4))}`);
        case "bottom":
          return cn(baseClasses, "top-full left-0", `mt-${Math.max(1, Math.floor(offset / 4))}`);
        case "left":
          return cn(baseClasses, "right-full top-0", `mr-${Math.max(1, Math.floor(offset / 4))}`);
        case "right":
          return cn(baseClasses, "left-full top-0", `ml-${Math.max(1, Math.floor(offset / 4))}`);
        default:
          return cn(baseClasses, "top-full left-0", `mt-${Math.max(1, Math.floor(offset / 4))}`);
      }
    };
    const getAlignmentClasses = () => {
      switch (align) {
        case "start":
          if (position === "top" || position === "bottom") {
            return "left-0";
          } else {
            return "top-0";
          }
        case "end":
          if (position === "top" || position === "bottom") {
            return "right-0";
          } else {
            return "bottom-0";
          }
        case "center":
        default:
          if (position === "top" || position === "bottom") {
            return "left-1/2 -translate-x-1/2";
          } else {
            return "top-1/2 -translate-y-1/2";
          }
      }
    };
    const getArrowClasses = () => {
      const baseClasses = "absolute w-0 h-0 border-4 border-transparent";
      switch (position) {
        case "top":
          return `${baseClasses} top-full left-1/2 -translate-x-1/2 border-t-gray-200 dark:border-t-gray-700`;
        case "bottom":
          return `${baseClasses} bottom-full left-1/2 -translate-x-1/2 border-b-gray-200 dark:border-b-gray-700`;
        case "left":
          return `${baseClasses} left-full top-1/2 -translate-y-1/2 border-l-gray-200 dark:border-l-gray-700`;
        case "right":
          return `${baseClasses} right-full top-1/2 -translate-y-1/2 border-r-gray-200 dark:border-r-gray-700`;
        default:
          return `${baseClasses} bottom-full left-1/2 -translate-x-1/2 border-b-gray-200 dark:border-b-gray-700`;
      }
    };
    return /* @__PURE__ */ jsxs("div", { ref, className: cn("relative", className), ...props, children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          ref: triggerRef,
          onClick: handleTriggerClick,
          className: "inline-block cursor-pointer",
          children: trigger
        }
      ),
      isOpen && /* @__PURE__ */ jsxs(
        "div",
        {
          ref: popoverRef,
          className: cn(
            "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 min-w-[200px]",
            getPositionClasses(),
            getAlignmentClasses()
          ),
          children: [
            /* @__PURE__ */ jsx("div", { className: getArrowClasses() }),
            /* @__PURE__ */ jsx("div", { className: "relative z-10", children })
          ]
        }
      )
    ] });
  }
);
Popover.displayName = "Popover";
var PopoverTrigger = React61.forwardRef(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("inline-block cursor-pointer", className),
      ...props,
      children
    }
  )
);
PopoverTrigger.displayName = "PopoverTrigger";
var PopoverContent = React61.forwardRef(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4", className),
      ...props,
      children
    }
  )
);
PopoverContent.displayName = "PopoverContent";
var Dropdown = React61.forwardRef(
  ({
    className,
    trigger,
    children,
    open: controlledOpen,
    onOpenChange,
    placement = "bottom",
    align = "start",
    offset = 8,
    disabled = false,
    showArrow = true,
    ...props
  }, ref) => {
    const [internalOpen, setInternalOpen] = React61.useState(false);
    const [coords, setCoords] = React61.useState({ x: 0, y: 0 });
    const triggerRef = React61.useRef(null);
    const dropdownRef = React61.useRef(null);
    const isControlled = controlledOpen !== void 0;
    const isOpen = isControlled ? controlledOpen : internalOpen;
    const handleOpenChange = (newOpen) => {
      if (disabled) return;
      if (!isControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange == null ? void 0 : onOpenChange(newOpen);
    };
    const handleTriggerClick = () => {
      handleOpenChange(!isOpen);
    };
    const updatePosition = React61.useCallback(() => {
      if (!triggerRef.current || !dropdownRef.current) return;
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      let x = 0;
      let y = 0;
      switch (placement) {
        case "top":
          x = triggerRect.left;
          y = triggerRect.top - offset;
          break;
        case "bottom":
          x = triggerRect.left;
          y = triggerRect.bottom + offset;
          break;
        case "left":
          x = triggerRect.left - offset;
          y = triggerRect.top;
          break;
        case "right":
          x = triggerRect.right + offset;
          y = triggerRect.top;
          break;
      }
      switch (align) {
        case "center":
          if (placement === "top" || placement === "bottom") {
            x = triggerRect.left + triggerRect.width / 2 - dropdownRect.width / 2;
          } else {
            y = triggerRect.top + triggerRect.height / 2 - dropdownRect.height / 2;
          }
          break;
        case "end":
          if (placement === "top" || placement === "bottom") {
            x = triggerRect.right - dropdownRect.width;
          } else {
            y = triggerRect.bottom - dropdownRect.height;
          }
          break;
      }
      if (x < 8) x = 8;
      if (x + dropdownRect.width > viewportWidth - 8) {
        x = viewportWidth - dropdownRect.width - 8;
      }
      if (y < 8) y = 8;
      if (y + dropdownRect.height > viewportHeight - 8) {
        y = viewportHeight - dropdownRect.height - 8;
      }
      setCoords({ x, y });
    }, [placement, align, offset]);
    React61.useEffect(() => {
      if (isOpen) {
        updatePosition();
        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition);
        return () => {
          window.removeEventListener("resize", updatePosition);
          window.removeEventListener("scroll", updatePosition);
        };
      }
    }, [isOpen, updatePosition]);
    React61.useEffect(() => {
      const handleClickOutside = (event) => {
        if (triggerRef.current && dropdownRef.current && !triggerRef.current.contains(event.target) && !dropdownRef.current.contains(event.target)) {
          handleOpenChange(false);
        }
      };
      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }
    }, [isOpen]);
    const getPlacementClasses = () => {
      switch (placement) {
        case "top":
          return "bottom-full left-0 mb-2";
        // 8px 간격
        case "bottom":
          return "top-full left-0 mt-2";
        // 8px 간격
        case "left":
          return "right-full top-0 mr-2";
        // 8px 간격
        case "right":
          return "left-full top-0 ml-2";
        // 8px 간격
        default:
          return "top-full left-0 mt-2";
      }
    };
    const getArrowClasses = () => {
      switch (placement) {
        case "top":
          return "top-full left-4 -translate-x-1/2 border-t-gray-100 dark:border-t-gray-800";
        case "bottom":
          return "bottom-full left-4 -translate-x-1/2 border-b-gray-100 dark:border-b-gray-800";
        case "left":
          return "left-full top-4 -translate-y-1/2 border-l-gray-100 dark:border-l-gray-800";
        case "right":
          return "right-full top-4 -translate-y-1/2 border-r-gray-100 dark:border-r-gray-800";
        default:
          return "bottom-full left-4 -translate-x-1/2 border-b-gray-100 dark:border-b-gray-800";
      }
    };
    return /* @__PURE__ */ jsxs("div", { ref, className: cn("relative", className), ...props, children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          ref: triggerRef,
          onClick: handleTriggerClick,
          className: "inline-block cursor-pointer",
          children: trigger
        }
      ),
      isOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "fixed inset-0 z-40",
            onClick: () => handleOpenChange(false)
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            ref: dropdownRef,
            className: cn(
              "absolute z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700",
              "min-w-[200px] max-w-[320px] py-1.5",
              "overflow-hidden",
              getPlacementClasses()
            ),
            style: {
              transform: `translate(${coords.x}px, ${coords.y}px)`,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
            },
            children: [
              showArrow && /* @__PURE__ */ jsx(
                "div",
                {
                  className: cn(
                    "absolute w-0 h-0 border-4 border-transparent",
                    getArrowClasses()
                  )
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "relative z-10", children })
            ]
          }
        )
      ] })
    ] });
  }
);
Dropdown.displayName = "Dropdown";
var DropdownItem = React61.forwardRef(
  ({
    className,
    icon,
    rightIcon,
    variant = "default",
    children,
    disabled,
    ...props
  }, ref) => {
    const getVariantClasses = () => {
      switch (variant) {
        case "destructive":
          return "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20";
        case "disabled":
          return "text-gray-400 dark:text-gray-500 cursor-not-allowed";
        default:
          return "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700";
      }
    };
    return /* @__PURE__ */ jsxs(
      "button",
      {
        ref,
        className: cn(
          "w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors",
          "focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          getVariantClasses(),
          className
        ),
        disabled: disabled || variant === "disabled",
        ...props,
        children: [
          icon && /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 flex items-center justify-center w-4 h-4 text-current", children: icon }),
          /* @__PURE__ */ jsx("span", { className: cn(
            "flex-1 text-left min-w-0",
            icon ? "" : rightIcon ? "" : ""
          ), children }),
          rightIcon && /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 flex items-center justify-center w-4 h-4 text-current ml-auto", children: rightIcon })
        ]
      }
    );
  }
);
DropdownItem.displayName = "DropdownItem";
var DropdownSeparator = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("h-px bg-gray-200 dark:bg-gray-700 my-1.5 mx-2", className),
      ...props
    }
  )
);
DropdownSeparator.displayName = "DropdownSeparator";
var DropdownLabel = React61.forwardRef(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn(
        "px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide",
        "first:pt-2 last:pb-2",
        className
      ),
      ...props,
      children
    }
  )
);
DropdownLabel.displayName = "DropdownLabel";
var DropdownMenu = React61.forwardRef(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("py-1", className),
      ...props,
      children
    }
  )
);
DropdownMenu.displayName = "DropdownMenu";
var DropdownGroup = React61.forwardRef(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("space-y-0.5", className),
      ...props,
      children
    }
  )
);
DropdownGroup.displayName = "DropdownGroup";
var Drawer = React61.forwardRef(
  ({
    open,
    onOpenChange,
    children,
    className,
    side = "right",
    size = "md",
    showBackdrop = true,
    closeOnBackdropClick = true,
    closeOnEscape = true,
    backdropClassName,
    viewportClassName,
    ...props
  }, ref) => {
    const [isVisible, setIsVisible] = React61.useState(false);
    const [isAnimating, setIsAnimating] = React61.useState(false);
    React61.useEffect(() => {
      if (open) {
        setIsVisible(true);
        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 50);
        return () => clearTimeout(timer);
      } else {
        setIsAnimating(true);
        const timer = setTimeout(() => {
          setIsVisible(false);
          setIsAnimating(false);
        }, 300);
        return () => clearTimeout(timer);
      }
    }, [open]);
    React61.useEffect(() => {
      if (!closeOnEscape) return;
      const handleEscape = (e) => {
        if (e.key === "Escape" && open) {
          onOpenChange(false);
        }
      };
      if (open) {
        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";
      }
      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "";
      };
    }, [open, closeOnEscape, onOpenChange]);
    if (!isVisible) return null;
    const sizeClasses2 = {
      sm: side === "left" || side === "right" ? "w-full max-w-md sm:max-w-lg" : "h-72",
      md: side === "left" || side === "right" ? "w-full max-w-lg sm:max-w-2xl" : "h-[28rem]",
      lg: side === "left" || side === "right" ? "w-full max-w-3xl sm:max-w-4xl" : "h-[34rem]",
      xl: side === "left" || side === "right" ? "w-full max-w-4xl sm:max-w-5xl" : "h-[42rem]",
      full: "w-full h-full"
    };
    const placementClasses = {
      left: "justify-start items-start sm:items-stretch",
      right: "justify-end items-start sm:items-stretch",
      top: "items-start justify-center",
      bottom: "items-end justify-center"
    };
    const transformClasses = {
      left: isAnimating ? open ? "translate-x-0" : "-translate-x-full" : "",
      right: isAnimating ? open ? "translate-x-0" : "translate-x-full" : "",
      top: isAnimating ? open ? "translate-y-0" : "-translate-y-full" : "",
      bottom: isAnimating ? open ? "translate-y-0" : "translate-y-full" : ""
    };
    return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[100]", children: [
      showBackdrop && /* @__PURE__ */ jsx(
        "div",
        {
          className: cn(
            "absolute inset-0 bg-gray-950/70 backdrop-blur-md transition-opacity duration-300",
            backdropClassName,
            isAnimating ? open ? "opacity-100" : "opacity-0" : open ? "opacity-100" : "opacity-0"
          ),
          onClick: closeOnBackdropClick ? () => onOpenChange(false) : void 0,
          style: { pointerEvents: open ? "auto" : "none" }
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: cn(
            "absolute inset-0 pointer-events-none flex p-4 sm:p-8 lg:p-10",
            placementClasses[side],
            viewportClassName
          ),
          children: /* @__PURE__ */ jsx(
            "div",
            {
              ref,
              className: cn(
                "pointer-events-auto bg-white/95 dark:!bg-gray-900/90 border border-gray-200/70 dark:!border-gray-700/50 shadow-[0_24px_80px_rgba(15,23,42,0.35)] rounded-3xl transition-transform duration-300 ease-out overflow-hidden flex flex-col max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)] backdrop-blur-xl",
                sizeClasses2[size],
                transformClasses[side],
                className
              ),
              style: { zIndex: 101 },
              ...props,
              children
            }
          )
        }
      )
    ] });
  }
);
Drawer.displayName = "Drawer";
var DrawerHeader = React61.forwardRef(
  ({ children, className, showCloseButton = true, onClose, ...props }, ref) => {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: cn(
          "flex items-center justify-between px-6 sm:px-8 py-5 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/70 dark:bg-gray-900/60 backdrop-blur",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex-1", children }),
          showCloseButton && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: onClose,
              className: "p-2 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-colors",
              children: /* @__PURE__ */ jsx(Icon, { name: "close", size: 20 })
            }
          )
        ]
      }
    );
  }
);
DrawerHeader.displayName = "DrawerHeader";
var drawerContentWidths = {
  xs: "max-w-sm",
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl"
};
var DrawerContent = React61.forwardRef(
  ({ children, className, maxWidth = "none", align = "start", padded = true, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn("flex-1 overflow-y-auto", padded && "p-6 sm:p-8", className),
        ...props,
        children: /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              maxWidth && maxWidth !== "none" && drawerContentWidths[maxWidth],
              maxWidth && maxWidth !== "none" && "w-full",
              align === "center" && "mx-auto"
            ),
            children
          }
        )
      }
    );
  }
);
DrawerContent.displayName = "DrawerContent";
var DrawerFooter = React61.forwardRef(
  ({ children, className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          "flex items-center justify-end gap-3 px-6 sm:px-8 py-5 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/70 dark:bg-gray-900/60 backdrop-blur",
          className
        ),
        ...props,
        children
      }
    );
  }
);
DrawerFooter.displayName = "DrawerFooter";
var BottomSheet = React61.forwardRef(
  ({
    open,
    onOpenChange,
    children,
    className,
    height = "md",
    showBackdrop = true,
    closeOnBackdropClick = true,
    closeOnEscape = true,
    showDragHandle = true,
    snapPoints = [25, 50, 75, 100],
    defaultSnap = 50,
    ...props
  }, ref) => {
    const [isVisible, setIsVisible] = React61.useState(false);
    const [isAnimating, setIsAnimating] = React61.useState(false);
    const [currentHeight, setCurrentHeight] = React61.useState(defaultSnap);
    const [isDragging, setIsDragging] = React61.useState(false);
    const [startY, setStartY] = React61.useState(0);
    const [currentY, setCurrentY] = React61.useState(0);
    const heightClasses = {
      sm: "h-64",
      md: "h-96",
      lg: "h-[32rem]",
      xl: "h-[40rem]",
      full: "h-full"
    };
    React61.useEffect(() => {
      if (open) {
        setIsVisible(true);
        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 50);
        return () => clearTimeout(timer);
      } else {
        setIsAnimating(true);
        const timer = setTimeout(() => {
          setIsVisible(false);
          setIsAnimating(false);
        }, 300);
        return () => clearTimeout(timer);
      }
    }, [open]);
    React61.useEffect(() => {
      if (!closeOnEscape) return;
      const handleEscape = (e) => {
        if (e.key === "Escape" && open) {
          onOpenChange(false);
        }
      };
      if (open) {
        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";
      }
      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "";
      };
    }, [open, closeOnEscape, onOpenChange]);
    const handleTouchStart = (e) => {
      setIsDragging(true);
      setStartY(e.touches[0].clientY);
      setCurrentY(e.touches[0].clientY);
    };
    const handleTouchMove = (e) => {
      if (!isDragging) return;
      setCurrentY(e.touches[0].clientY);
    };
    const handleTouchEnd = () => {
      if (!isDragging) return;
      setIsDragging(false);
      const deltaY = currentY - startY;
      const threshold = 100;
      if (deltaY > threshold) {
        onOpenChange(false);
      } else if (deltaY < -threshold) {
        const currentIndex = snapPoints.indexOf(currentHeight);
        const nextIndex = Math.min(currentIndex + 1, snapPoints.length - 1);
        setCurrentHeight(snapPoints[nextIndex]);
      }
    };
    if (!isVisible) return null;
    return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50", children: [
      showBackdrop && /* @__PURE__ */ jsx(
        "div",
        {
          className: cn(
            "absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
            isAnimating ? open ? "opacity-100" : "opacity-0" : ""
          ),
          onClick: closeOnBackdropClick ? () => onOpenChange(false) : void 0
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          ref,
          className: cn(
            "absolute bottom-0 left-0 right-0 bg-white/95 dark:!bg-gray-800/95 backdrop-blur-xl border-t border-gray-200/50 dark:!border-gray-600/50 shadow-2xl rounded-t-2xl transition-transform duration-300 ease-out pb-safe",
            heightClasses[height],
            isAnimating ? open ? "translate-y-0" : "translate-y-full" : "",
            className
          ),
          style: {
            height: `${currentHeight}%`,
            transform: isDragging ? `translateY(${currentY - startY}px)` : void 0
          },
          onTouchStart: handleTouchStart,
          onTouchMove: handleTouchMove,
          onTouchEnd: handleTouchEnd,
          ...props,
          children: [
            showDragHandle && /* @__PURE__ */ jsx("div", { className: "flex justify-center pt-3 pb-2", children: /* @__PURE__ */ jsx("div", { className: "w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" }) }),
            children
          ]
        }
      )
    ] });
  }
);
BottomSheet.displayName = "BottomSheet";
var BottomSheetHeader = React61.forwardRef(
  ({ children, className, showCloseButton = true, onClose, ...props }, ref) => {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: cn("flex items-center justify-between px-6 py-4", className),
        ...props,
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex-1", children }),
          showCloseButton && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: onClose,
              className: "p-2 rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-colors",
              children: /* @__PURE__ */ jsx(Icon, { name: "close", size: 20 })
            }
          )
        ]
      }
    );
  }
);
BottomSheetHeader.displayName = "BottomSheetHeader";
var BottomSheetContent = React61.forwardRef(
  ({ children, className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn("flex-1 px-6 pb-6 overflow-y-auto", className),
        ...props,
        children
      }
    );
  }
);
BottomSheetContent.displayName = "BottomSheetContent";
var ConfirmModal = React61.forwardRef(
  ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    warning,
    confirmText = "\uD655\uC778",
    cancelText = "\uCDE8\uC18C",
    confirmButtonText,
    type = "danger",
    loading = false,
    disabled = false,
    showInput = false,
    inputValue = "",
    onInputChange,
    inputPlaceholder,
    inputLabel,
    requiredInputValue,
    showCancel = true,
    size = "md"
  }, ref) => {
    const typeConfig = {
      danger: {
        icon: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6 text-red-600 dark:text-red-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" }) }),
        bgColor: "bg-red-100 dark:bg-red-900/20",
        buttonColor: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
        textColor: "text-red-600 dark:text-red-400"
      },
      warning: {
        icon: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6 text-yellow-600 dark:text-yellow-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" }) }),
        bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
        buttonColor: "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500",
        textColor: "text-yellow-600 dark:text-yellow-400"
      },
      info: {
        icon: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6 text-blue-600 dark:text-blue-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
        bgColor: "bg-blue-100 dark:bg-blue-900/20",
        buttonColor: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
        textColor: "text-blue-600 dark:text-blue-400"
      },
      success: {
        icon: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6 text-green-600 dark:text-green-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }),
        bgColor: "bg-green-100 dark:bg-green-900/20",
        buttonColor: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
        textColor: "text-green-600 dark:text-green-400"
      },
      error: {
        icon: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6 text-red-600 dark:text-red-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }),
        bgColor: "bg-red-100 dark:bg-red-900/20",
        buttonColor: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
        textColor: "text-red-600 dark:text-red-400"
      }
    };
    const config = typeConfig[type];
    const isInputValid = !showInput || !requiredInputValue || inputValue === requiredInputValue;
    const isDisabled = disabled || loading || !isInputValid;
    return /* @__PURE__ */ jsx(
      Modal,
      {
        isOpen,
        onClose,
        showCloseButton: false,
        size,
        children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: cn(
            "mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-6",
            // 64px 아이콘, 24px 여백
            config.bgColor
          ), children: config.icon }),
          /* @__PURE__ */ jsxs("h3", { className: "text-xl font-semibold text-gray-900 dark:text-white mb-4", children: [
            " ",
            title
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            " ",
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: message }),
            warning && /* @__PURE__ */ jsx("p", { className: cn(
              "text-sm mt-3 font-medium",
              // 12px 여백
              config.textColor
            ), children: warning })
          ] }),
          showInput && /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            " ",
            /* @__PURE__ */ jsxs("label", { htmlFor: "confirmInput", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-left", children: [
              " ",
              inputLabel
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                id: "confirmInput",
                value: inputValue,
                onChange: (e) => onInputChange == null ? void 0 : onInputChange(e.target.value),
                placeholder: inputPlaceholder,
                className: "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: cn(
            "flex gap-3",
            // 12px 간격
            showCancel ? "justify-center" : "justify-center"
          ), children: [
            showCancel && /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                onClick: onClose,
                disabled: loading,
                className: "px-6 py-3",
                children: cancelText
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "default",
                onClick: onConfirm,
                disabled: isDisabled,
                className: cn(
                  "px-6 py-3",
                  // 24px, 12px 패딩
                  config.buttonColor
                ),
                children: loading ? /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsxs("svg", { className: "animate-spin -ml-1 mr-2 h-4 w-4 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
                    /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                    /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
                  ] }),
                  "\uCC98\uB9AC \uC911..."
                ] }) : confirmButtonText || confirmText
              }
            )
          ] })
        ] })
      }
    );
  }
);
ConfirmModal.displayName = "ConfirmModal";
var Form = React61__default.forwardRef(
  ({
    className,
    children,
    onSubmit,
    variant = "default",
    ...props
  }, ref) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit == null ? void 0 : onSubmit(e);
    };
    const variantClasses = {
      default: "space-y-6",
      glass: "space-y-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-xl dark:bg-slate-800/20 dark:border-slate-700/50"
    };
    return /* @__PURE__ */ jsx(
      "form",
      {
        ref,
        onSubmit: handleSubmit,
        className: cn(variantClasses[variant], className),
        ...props,
        children
      }
    );
  }
);
Form.displayName = "Form";
var FormField = React61__default.forwardRef(
  ({
    className,
    children,
    error,
    required,
    ...props
  }, ref) => {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: cn("space-y-2", className),
        ...props,
        children: [
          children,
          error && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-600 dark:text-red-400", children: error })
        ]
      }
    );
  }
);
FormField.displayName = "FormField";
var FormGroup = React61__default.forwardRef(
  ({
    className,
    children,
    inline = false,
    ...props
  }, ref) => {
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          inline ? "flex gap-4" : "space-y-4",
          className
        ),
        ...props,
        children
      }
    );
  }
);
FormGroup.displayName = "FormGroup";
var Label = React61__default.forwardRef(
  ({
    className,
    children,
    required = false,
    error = false,
    disabled = false,
    variant = "default",
    ...props
  }, ref) => {
    const variantClasses = {
      default: cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        error && "text-red-600 dark:text-red-400",
        disabled && "text-slate-400 dark:text-slate-500",
        !error && !disabled && "text-slate-700 dark:text-slate-300"
      ),
      glass: cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        error && "text-red-400",
        disabled && "text-white/50",
        !error && !disabled && "text-white"
      )
    };
    return /* @__PURE__ */ jsxs(
      "label",
      {
        ref,
        className: cn(variantClasses[variant], className),
        ...props,
        children: [
          children,
          required && /* @__PURE__ */ jsx("span", { className: variant === "glass" ? "text-red-400 ml-1" : "text-red-500 ml-1", children: "*" })
        ]
      }
    );
  }
);
Label.displayName = "Label";
var Checkbox = React61.forwardRef(
  ({
    className,
    variant = "default",
    size = "md",
    error = false,
    success = false,
    label,
    description,
    ...props
  }, ref) => {
    const sizeClasses2 = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6"
    };
    const variantClasses = {
      default: "border-gray-300 bg-white text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-blue-400",
      outline: "border-2 border-gray-200 bg-transparent text-blue-600 focus:ring-blue-500 dark:border-gray-700 dark:focus:ring-blue-400",
      filled: "border-transparent bg-gray-50 text-blue-600 focus:bg-white focus:ring-blue-500 dark:bg-gray-700 dark:focus:bg-gray-800 dark:focus:ring-blue-400",
      glass: "border-white/30 bg-white/10 backdrop-blur-sm text-white focus:ring-blue-400/50 focus:bg-white/20 dark:border-slate-600/50 dark:bg-slate-800/10 dark:focus:ring-blue-400/50 dark:focus:bg-slate-700/20"
    };
    const stateClasses = error ? "border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:ring-red-400" : success ? "border-green-500 focus:ring-green-500 dark:border-green-400 dark:focus:ring-green-400" : "";
    return /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            className: cn(
              "peer sr-only",
              className
            ),
            ref,
            ...props
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "flex items-center justify-center rounded border transition-all duration-200 cursor-pointer relative",
              "peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-offset-2",
              "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
              sizeClasses2[size],
              variantClasses[variant],
              stateClasses,
              "peer-checked:bg-blue-600 peer-checked:border-blue-600 dark:peer-checked:bg-blue-500 dark:peer-checked:border-blue-500"
            ),
            children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-1 h-2 border-r-2 border-b-2 border-white transform rotate-45 opacity-0 peer-checked:opacity-100 transition-opacity duration-200" }) })
          }
        )
      ] }),
      (label || description) && /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
        label && /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-gray-900 dark:text-white cursor-pointer", children: label }),
        description && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: description })
      ] })
    ] });
  }
);
Checkbox.displayName = "Checkbox";
var Radio = React61.forwardRef(
  ({
    className,
    variant = "default",
    size = "md",
    error = false,
    success = false,
    label,
    description,
    ...props
  }, ref) => {
    const sizeClasses2 = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6"
    };
    const dotSizes = {
      sm: "w-1.5 h-1.5",
      md: "w-2 h-2",
      lg: "w-2.5 h-2.5"
    };
    const variantClasses = {
      default: "border-gray-300 bg-white text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-blue-400",
      outline: "border-2 border-gray-200 bg-transparent text-blue-600 focus:ring-blue-500 dark:border-gray-700 dark:focus:ring-blue-400",
      filled: "border-transparent bg-gray-50 text-blue-600 focus:bg-white focus:ring-blue-500 dark:bg-gray-700 dark:focus:bg-gray-800 dark:focus:ring-blue-400",
      glass: "border-white/30 bg-white/10 backdrop-blur-sm text-white focus:ring-blue-400/50 focus:bg-white/20 dark:border-slate-600/50 dark:bg-slate-800/10 dark:focus:ring-blue-400/50 dark:focus:bg-slate-700/20"
    };
    const stateClasses = error ? "border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:ring-red-400" : success ? "border-green-500 focus:ring-green-500 dark:border-green-400 dark:focus:ring-green-400" : "";
    return /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex-shrink-0", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "radio",
            className: cn(
              "peer sr-only",
              className
            ),
            ref,
            ...props
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "flex items-center justify-center rounded-full border-2 transition-all duration-200 cursor-pointer",
              "peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 peer-focus:ring-offset-2 dark:peer-focus:ring-offset-gray-900",
              "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
              "hover:border-blue-400 dark:hover:border-blue-500",
              sizeClasses2[size],
              variantClasses[variant],
              stateClasses,
              "peer-checked:border-blue-600 dark:peer-checked:border-blue-500 peer-checked:ring-2 peer-checked:ring-blue-500/20"
            ),
            children: /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "rounded-full bg-blue-600 dark:bg-blue-500 opacity-0 peer-checked:opacity-100 transition-all duration-200",
                  "scale-0 peer-checked:scale-100",
                  dotSizes[size]
                )
              }
            )
          }
        )
      ] }),
      (label || description) && /* @__PURE__ */ jsxs("div", { className: "flex flex-col pt-0.5", children: [
        label && /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: props.id,
            className: "text-sm font-medium text-gray-900 dark:text-white cursor-pointer select-none",
            onClick: () => {
              var _a;
              return !props.disabled && ref && typeof ref !== "function" && ((_a = ref.current) == null ? void 0 : _a.click());
            },
            children: label
          }
        ),
        description && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-0.5", children: description })
      ] })
    ] });
  }
);
Radio.displayName = "Radio";
var Select = React61.forwardRef(
  ({
    className,
    variant = "default",
    size = "md",
    error = false,
    success = false,
    leftIcon,
    placeholder,
    children,
    ...props
  }, ref) => {
    const variantClasses = {
      default: "border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400",
      outline: "border-2 border-gray-200 bg-transparent text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400",
      filled: "border-transparent bg-gray-50 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:focus:bg-gray-800 dark:focus:border-blue-400 dark:focus:ring-blue-400",
      ghost: "border-transparent bg-transparent text-gray-900 focus:bg-gray-50 focus:border-gray-300 focus:ring-gray-500 dark:text-white dark:focus:bg-gray-800 dark:focus:border-gray-600 dark:focus:ring-gray-400",
      glass: "border-white/30 bg-white/10 backdrop-blur-sm text-white focus:border-blue-400/50 focus:ring-blue-400/20 focus:bg-white/20 dark:border-slate-600/50 dark:bg-slate-800/10 dark:text-slate-200 dark:focus:border-blue-400/50 dark:focus:ring-blue-400/20 dark:focus:bg-slate-700/20"
    };
    const sizeClasses2 = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-base",
      lg: "h-12 px-4 text-lg"
    };
    const stateClasses = error ? "border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:border-red-400 dark:focus:ring-red-400" : success ? "border-green-500 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:focus:border-green-400 dark:focus:ring-green-400" : "";
    return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      leftIcon && /* @__PURE__ */ jsx("div", { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none z-10", children: leftIcon }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          className: cn(
            "flex w-full appearance-none rounded-md border transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50 dark:disabled:bg-gray-800",
            "hover:border-gray-400 dark:hover:border-gray-500",
            variantClasses[variant],
            sizeClasses2[size],
            stateClasses,
            leftIcon ? "pl-10" : "",
            "pr-10",
            // 화살표 아이콘을 위한 공간
            className
          ),
          ref,
          ...props,
          children: [
            placeholder && /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: placeholder }),
            children
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none z-10", children: /* @__PURE__ */ jsx(Icon, { name: "chevronDown", size: 16 }) })
    ] });
  }
);
Select.displayName = "Select";
var SelectOption = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "option",
    {
      className: cn("", className),
      ref,
      ...props
    }
  )
);
SelectOption.displayName = "SelectOption";
var Switch = React61.forwardRef(
  ({
    className,
    variant = "default",
    size = "md",
    error = false,
    success = false,
    label,
    description,
    ...props
  }, ref) => {
    const sizeClasses2 = {
      sm: "w-8 h-4",
      md: "w-11 h-6",
      lg: "w-14 h-7"
    };
    const thumbSizes = {
      sm: "w-3 h-3",
      md: "w-5 h-5",
      lg: "w-6 h-6"
    };
    const variantClasses = {
      default: "bg-gray-200 peer-checked:bg-blue-600 dark:bg-gray-700 dark:peer-checked:bg-blue-500",
      outline: "bg-transparent border-2 border-gray-300 peer-checked:border-blue-600 peer-checked:bg-blue-600 dark:border-gray-600 dark:peer-checked:border-blue-500 dark:peer-checked:bg-blue-500",
      filled: "bg-gray-100 peer-checked:bg-blue-600 dark:bg-gray-800 dark:peer-checked:bg-blue-500",
      glass: "bg-white/20 backdrop-blur-sm border border-white/30 peer-checked:bg-blue-400/50 peer-checked:border-blue-300/50 dark:bg-slate-800/20 dark:border-slate-700/50 dark:peer-checked:bg-blue-400/50 dark:peer-checked:border-blue-300/50"
    };
    const stateClasses = error ? "bg-red-200 peer-checked:bg-red-600 dark:bg-red-800 dark:peer-checked:bg-red-500" : success ? "bg-green-200 peer-checked:bg-green-600 dark:bg-green-800 dark:peer-checked:bg-green-500" : "";
    return /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex-shrink-0", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            className: cn(
              "peer sr-only",
              className
            ),
            ref,
            ...props
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "relative inline-flex cursor-pointer items-center rounded-full transition-all duration-200 ease-in-out",
              "peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 peer-focus:ring-offset-2 dark:peer-focus:ring-offset-gray-900",
              "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
              sizeClasses2[size],
              variantClasses[variant],
              stateClasses
            ),
            children: /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "pointer-events-none block rounded-full bg-white shadow-md ring-0 transition-all duration-200 ease-in-out",
                  "peer-checked:translate-x-full peer-checked:shadow-lg",
                  thumbSizes[size],
                  size === "sm" ? "translate-x-0.5 peer-checked:translate-x-4.5" : "",
                  size === "md" ? "translate-x-0.5 peer-checked:translate-x-5.5" : "",
                  size === "lg" ? "translate-x-0.5 peer-checked:translate-x-7" : ""
                )
              }
            )
          }
        )
      ] }),
      (label || description) && /* @__PURE__ */ jsxs("div", { className: "flex flex-col pt-0.5", children: [
        label && /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: props.id,
            className: "text-sm font-medium text-gray-900 dark:text-white cursor-pointer select-none",
            onClick: () => {
              var _a;
              return !props.disabled && ref && typeof ref !== "function" && ((_a = ref.current) == null ? void 0 : _a.click());
            },
            children: label
          }
        ),
        description && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-0.5", children: description })
      ] })
    ] });
  }
);
Switch.displayName = "Switch";
var Toggle = React61.forwardRef(
  ({
    className,
    variant = "default",
    size = "md",
    pressed: controlledPressed,
    onPressedChange,
    label,
    description,
    icon,
    iconPosition = "left",
    onClick,
    ...props
  }, ref) => {
    const [internalPressed, setInternalPressed] = React61.useState(false);
    const isControlled = controlledPressed !== void 0;
    const pressed = isControlled ? controlledPressed : internalPressed;
    const handleClick = (e) => {
      if (!isControlled) {
        setInternalPressed(!pressed);
      }
      onPressedChange == null ? void 0 : onPressedChange(!pressed);
      onClick == null ? void 0 : onClick(e);
    };
    const sizeClasses2 = {
      sm: "h-7 px-3 text-sm",
      md: "h-9 px-4 text-base",
      lg: "h-11 px-5 text-lg"
    };
    const variantClasses = {
      default: pressed ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700",
      outline: pressed ? "border-2 border-blue-600 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:border-blue-500 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30" : "border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800",
      filled: pressed ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600" : "bg-gray-50 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600",
      ghost: pressed ? "bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30" : "bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
      glass: pressed ? "bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 dark:bg-blue-400/20 dark:border-blue-300/50 dark:hover:bg-blue-400/30" : "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 dark:bg-slate-800/10 dark:border-slate-600/50 dark:text-slate-200 dark:hover:bg-slate-700/20"
    };
    return /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          ref,
          className: cn(
            "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            sizeClasses2[size],
            variantClasses[variant],
            className
          ),
          onClick: handleClick,
          "aria-pressed": pressed,
          ...props,
          children: [
            icon && iconPosition === "left" && /* @__PURE__ */ jsx("span", { className: "flex-shrink-0", children: icon }),
            label && /* @__PURE__ */ jsx("span", { children: label }),
            icon && iconPosition === "right" && /* @__PURE__ */ jsx("span", { className: "flex-shrink-0", children: icon })
          ]
        }
      ),
      description && /* @__PURE__ */ jsx("div", { className: "flex flex-col", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: description }) })
    ] });
  }
);
Toggle.displayName = "Toggle";
var Slider = React61.forwardRef(
  ({
    className,
    variant = "default",
    size = "md",
    showValue = false,
    showLabel = false,
    label,
    min = 0,
    max = 100,
    step = 1,
    value = 0,
    onValueChange,
    orientation = "horizontal",
    disabled = false,
    ...props
  }, ref) => {
    const isRange = Array.isArray(value);
    const currentValue = isRange ? value : [value];
    const handleChange = (e) => {
      const newValue = parseFloat(e.target.value);
      if (onValueChange) {
        if (isRange) {
          const index = parseInt(e.target.dataset.index || "0");
          const newRange = [...currentValue];
          newRange[index] = newValue;
          onValueChange(newRange);
        } else {
          onValueChange(newValue);
        }
      }
    };
    const variantClasses = {
      default: "bg-gray-200 dark:bg-gray-700",
      primary: "bg-blue-200 dark:bg-blue-700",
      success: "bg-green-200 dark:bg-green-700",
      warning: "bg-yellow-200 dark:bg-yellow-700",
      danger: "bg-red-200 dark:bg-red-700"
    };
    const thumbVariantClasses = {
      default: "bg-gray-400 hover:bg-gray-500 dark:bg-gray-500 dark:hover:bg-gray-400",
      primary: "bg-blue-500 hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500",
      success: "bg-green-500 hover:bg-green-600 dark:bg-green-400 dark:hover:bg-green-500",
      warning: "bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500",
      danger: "bg-red-500 hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-500"
    };
    const sizeClasses2 = {
      sm: orientation === "horizontal" ? "h-1" : "w-1",
      md: orientation === "horizontal" ? "h-2" : "w-2",
      lg: orientation === "horizontal" ? "h-3" : "w-3"
    };
    const thumbSizeClasses = {
      sm: "w-3 h-3",
      md: "w-4 h-4",
      lg: "w-6 h-6"
    };
    const orientationClasses = orientation === "vertical" ? "flex-col h-full" : "flex-row w-full";
    const renderSlider = (index = 0) => /* @__PURE__ */ jsx(
      "input",
      {
        ref: index === 0 ? ref : void 0,
        type: "range",
        min,
        max,
        step,
        value: currentValue[index],
        onChange: handleChange,
        "data-index": index,
        disabled,
        className: cn(
          "appearance-none cursor-pointer rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          sizeClasses2[size],
          variantClasses[variant],
          orientation === "vertical" ? "writing-mode: bt-lr; -webkit-appearance: slider-vertical" : "",
          className
        ),
        style: {
          ...orientation === "vertical" && {
            writingMode: "vertical-rl",
            WebkitAppearance: "slider-vertical"
          }
        },
        ...props
      },
      index
    );
    const renderValue = () => {
      if (!showValue) return null;
      if (isRange) {
        return /* @__PURE__ */ jsx("div", { className: "flex gap-2 text-sm text-gray-600 dark:text-gray-400", children: currentValue.map((val, index) => /* @__PURE__ */ jsx("span", { className: "font-mono", children: val }, index)) });
      }
      return /* @__PURE__ */ jsx("span", { className: "text-sm font-mono text-gray-600 dark:text-gray-400", children: currentValue[0] });
    };
    return /* @__PURE__ */ jsxs("div", { className: cn("flex items-center gap-4", orientationClasses), children: [
      showLabel && label && /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-gray-700 dark:text-gray-300 min-w-0", children: label }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 relative", children: [
        /* @__PURE__ */ jsxs("div", { className: cn("relative", orientation === "vertical" ? "h-full" : "w-full"), children: [
          /* @__PURE__ */ jsx("div", { className: cn(
            "absolute rounded-full",
            sizeClasses2[size],
            variantClasses[variant],
            orientation === "vertical" ? "w-full bottom-0" : "h-full left-0"
          ) }),
          isRange ? (
            // 범위 슬라이더
            /* @__PURE__ */ jsx("div", { className: cn(
              "absolute rounded-full bg-blue-500 dark:bg-blue-400",
              sizeClasses2[size],
              orientation === "vertical" ? "w-full bottom-0" : "h-full left-0"
            ), style: {
              ...orientation === "vertical" ? {
                bottom: `${(currentValue[0] - min) / (max - min) * 100}%`,
                height: `${(currentValue[1] - currentValue[0]) / (max - min) * 100}%`
              } : {
                left: `${(currentValue[0] - min) / (max - min) * 100}%`,
                width: `${(currentValue[1] - currentValue[0]) / (max - min) * 100}%`
              }
            } })
          ) : (
            // 단일 슬라이더
            /* @__PURE__ */ jsx("div", { className: cn(
              "absolute rounded-full bg-blue-500 dark:bg-blue-400",
              sizeClasses2[size],
              orientation === "vertical" ? "w-full bottom-0" : "h-full left-0"
            ), style: {
              ...orientation === "vertical" ? { height: `${(currentValue[0] - min) / (max - min) * 100}%` } : { width: `${(currentValue[0] - min) / (max - min) * 100}%` }
            } })
          ),
          isRange ? (
            // 범위 슬라이더 핸들
            currentValue.map((_, index) => /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "absolute rounded-full border-2 border-white shadow-lg transition-all duration-200 hover:scale-110",
                  thumbSizeClasses[size],
                  thumbVariantClasses[variant],
                  orientation === "vertical" ? "left-1/2 transform -translate-x-1/2" : "top-1/2 transform -translate-y-1/2"
                ),
                style: {
                  ...orientation === "vertical" ? { bottom: `${(currentValue[index] - min) / (max - min) * 100}%` } : { left: `${(currentValue[index] - min) / (max - min) * 100}%` }
                }
              },
              index
            ))
          ) : (
            // 단일 슬라이더 핸들
            /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "absolute rounded-full border-2 border-white shadow-lg transition-all duration-200 hover:scale-110",
                  thumbSizeClasses[size],
                  thumbVariantClasses[variant],
                  orientation === "vertical" ? "left-1/2 transform -translate-x-1/2" : "top-1/2 transform -translate-y-1/2"
                ),
                style: {
                  ...orientation === "vertical" ? { bottom: `${(currentValue[0] - min) / (max - min) * 100}%` } : { left: `${(currentValue[0] - min) / (max - min) * 100}%` }
                }
              }
            )
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-0", children: isRange ? currentValue.map((_, index) => renderSlider(index)) : renderSlider() })
      ] }),
      renderValue()
    ] });
  }
);
Slider.displayName = "Slider";
var Textarea = React61.forwardRef(
  ({
    className,
    variant = "default",
    size = "md",
    error = false,
    success = false,
    resize = "vertical",
    ...props
  }, ref) => {
    const variantClasses = {
      default: "border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400",
      outline: "border-2 border-gray-200 bg-transparent text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400",
      filled: "border-transparent bg-gray-50 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:bg-gray-800 dark:focus:border-blue-400 dark:focus:ring-blue-400",
      ghost: "border-transparent bg-transparent text-gray-900 placeholder-gray-500 focus:bg-gray-50 focus:border-gray-300 focus:ring-gray-500 dark:text-white dark:placeholder-gray-400 dark:focus:bg-gray-800 dark:focus:border-gray-600 dark:focus:ring-gray-400",
      glass: "border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:border-blue-400/50 focus:ring-blue-400/20 focus:bg-white/20 dark:border-slate-600/50 dark:bg-slate-800/10 dark:text-slate-200 dark:placeholder-slate-400 dark:focus:border-blue-400/50 dark:focus:ring-blue-400/20 dark:focus:bg-slate-700/20"
    };
    const sizeClasses2 = {
      sm: "px-3 py-2 text-sm min-h-[80px]",
      md: "px-4 py-3 text-base min-h-[100px]",
      lg: "px-4 py-3 text-lg min-h-[120px]"
    };
    const resizeClasses = {
      none: "resize-none",
      vertical: "resize-y",
      horizontal: "resize-x",
      both: "resize"
    };
    const stateClasses = error ? "border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:border-red-400 dark:focus:ring-red-400" : success ? "border-green-500 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:focus:border-green-400 dark:focus:ring-green-400" : "";
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        className: cn(
          "flex w-full rounded-md border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          variantClasses[variant],
          sizeClasses2[size],
          resizeClasses[resize],
          stateClasses,
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
var Accordion = React61.forwardRef(
  ({
    children,
    className,
    type = "single",
    defaultValue,
    value,
    onValueChange,
    collapsible = false,
    ...props
  }, ref) => {
    const [openItems, setOpenItems] = React61.useState(
      value ? Array.isArray(value) ? value : [value] : defaultValue ? Array.isArray(defaultValue) ? defaultValue : [defaultValue] : []
    );
    React61.useEffect(() => {
      if (value !== void 0) {
        setOpenItems(Array.isArray(value) ? value : [value]);
      }
    }, [value]);
    const handleItemToggle = (itemValue) => {
      let newOpenItems;
      if (type === "single") {
        if (openItems.includes(itemValue)) {
          newOpenItems = collapsible ? [] : openItems;
        } else {
          newOpenItems = [itemValue];
        }
      } else {
        if (openItems.includes(itemValue)) {
          newOpenItems = openItems.filter((item) => item !== itemValue);
        } else {
          newOpenItems = [...openItems, itemValue];
        }
      }
      setOpenItems(newOpenItems);
      onValueChange == null ? void 0 : onValueChange(type === "single" ? newOpenItems[0] || "" : newOpenItems);
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn("space-y-2", className),
        ...props,
        children: React61.Children.map(children, (child) => {
          if (React61.isValidElement(child)) {
            return React61.cloneElement(child, {
              openItems,
              onToggle: handleItemToggle,
              ...child.props
            });
          }
          return child;
        })
      }
    );
  }
);
Accordion.displayName = "Accordion";
var AccordionItem = React61.forwardRef(
  ({
    value,
    children,
    className,
    disabled = false,
    openItems = [],
    onToggle,
    ...props
  }, ref) => {
    const isOpen = openItems.includes(value);
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          "border border-gray-200/50 dark:border-gray-700/50 rounded-lg overflow-hidden",
          disabled && "opacity-50 pointer-events-none",
          className
        ),
        ...props,
        children: React61.Children.map(children, (child) => {
          if (React61.isValidElement(child)) {
            return React61.cloneElement(child, {
              value,
              isOpen,
              disabled,
              onToggle: () => onToggle == null ? void 0 : onToggle(value),
              ...child.props
            });
          }
          return child;
        })
      }
    );
  }
);
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = React61.forwardRef(
  ({
    children,
    className,
    icon,
    iconPosition = "right",
    isOpen = false,
    disabled = false,
    onToggle,
    ...props
  }, ref) => {
    const defaultIcon = /* @__PURE__ */ jsx(
      Icon,
      {
        name: "chevronDown",
        size: 20,
        className: cn(
          "transition-transform duration-300 ease-out text-gray-500 dark:text-gray-400",
          isOpen && "rotate-180"
        )
      }
    );
    return /* @__PURE__ */ jsxs(
      "button",
      {
        ref,
        onClick: onToggle,
        disabled,
        className: cn(
          "flex w-full items-center justify-between px-6 py-4 text-left font-medium transition-all hover:bg-gray-50/80 dark:hover:bg-gray-800/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 flex-1", children: [
            iconPosition === "left" && (icon || defaultIcon),
            /* @__PURE__ */ jsx("span", { className: "flex-1", children })
          ] }),
          iconPosition === "right" && (icon || defaultIcon)
        ]
      }
    );
  }
);
AccordionTrigger.displayName = "AccordionTrigger";
var AccordionContent = React61.forwardRef(
  ({ children, className, isOpen = false, ...props }, ref) => {
    const [height, setHeight] = React61.useState(0);
    const contentRef = React61.useRef(null);
    React61.useEffect(() => {
      if (contentRef.current) {
        if (isOpen) {
          setHeight(contentRef.current.scrollHeight);
        } else {
          setHeight(0);
        }
      }
    }, [isOpen, children]);
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: "overflow-hidden transition-all duration-300 ease-out",
        style: { height: `${height}px` },
        ...props,
        children: /* @__PURE__ */ jsx(
          "div",
          {
            ref: contentRef,
            className: cn("px-6 pt-2 pb-4", className),
            children
          }
        )
      }
    );
  }
);
AccordionContent.displayName = "AccordionContent";
var TabsContent = React61__default.forwardRef(
  ({ className, value, active, children, ...props }, ref) => {
    if (active === false) return null;
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: merge(
          "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        ),
        ...props,
        children
      }
    );
  }
);
TabsContent.displayName = "TabsContent";
var Tabs = React61__default.forwardRef(
  ({
    className,
    value,
    defaultValue,
    onValueChange,
    orientation = "horizontal",
    variant = "default",
    size = "md",
    children,
    ...props
  }, ref) => {
    const [activeTab, setActiveTab] = React61__default.useState(value || defaultValue || "");
    const isControlled = value !== void 0;
    const currentValue = isControlled ? value : activeTab;
    const handleTabChange = (newValue) => {
      if (!isControlled) {
        setActiveTab(newValue);
      }
      onValueChange == null ? void 0 : onValueChange(newValue);
    };
    React61__default.useEffect(() => {
      if (value !== void 0) {
        setActiveTab(value);
      }
    }, [value]);
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: merge(
          "w-full",
          orientation === "vertical" && "flex",
          className
        ),
        ...props,
        children: React61__default.Children.map(children, (child) => {
          if (React61__default.isValidElement(child)) {
            if (child.type === TabsContent) {
              const childProps = child.props;
              return React61__default.cloneElement(child, {
                value: currentValue,
                onValueChange: handleTabChange,
                orientation,
                variant,
                size,
                active: childProps.value === currentValue
              });
            }
            return React61__default.cloneElement(child, {
              value: currentValue,
              onValueChange: handleTabChange,
              orientation,
              variant,
              size
            });
          }
          return child;
        })
      }
    );
  }
);
Tabs.displayName = "Tabs";
var TabsList = React61__default.forwardRef(
  ({
    className,
    value,
    onValueChange,
    orientation = "horizontal",
    variant = "default",
    size = "md",
    children,
    ...props
  }, ref) => {
    const getVariantClasses = () => {
      switch (variant) {
        case "pills":
          return "bg-gray-50 dark:bg-gray-800/80 p-3 rounded-xl border border-gray-200/50 dark:border-gray-700/50";
        case "underline":
          return "border-b border-gray-200 dark:border-gray-700";
        case "cards":
          return "bg-gray-50/80 dark:bg-gray-900/80 p-3 rounded-xl border border-gray-200/50 dark:border-gray-700/50";
        default:
          return "bg-gray-50 dark:bg-gray-800/80 p-3 rounded-xl border border-gray-200/50 dark:border-gray-700/50";
      }
    };
    const getSizeClasses = () => {
      switch (size) {
        case "sm":
          return "h-12";
        case "lg":
          return "h-16";
        default:
          return "h-14";
      }
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: merge(
          "flex items-center justify-center",
          orientation === "vertical" && "flex-col",
          getVariantClasses(),
          getSizeClasses(),
          className
        ),
        ...props,
        children: React61__default.Children.map(children, (child) => {
          if (React61__default.isValidElement(child)) {
            return React61__default.cloneElement(child, {
              value,
              onValueChange,
              orientation,
              variant,
              size
            });
          }
          return child;
        })
      }
    );
  }
);
TabsList.displayName = "TabsList";
var TabsTrigger = React61__default.forwardRef(
  ({
    className,
    value,
    onValueChange,
    orientation = "horizontal",
    variant = "default",
    size = "md",
    active = false,
    children,
    ...props
  }, ref) => {
    const getVariantClasses = () => {
      switch (variant) {
        case "pills":
          return merge(
            "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
            active ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-md" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          );
        case "underline":
          return merge(
            "inline-flex items-center justify-center whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
            active ? "border-blue-500 text-blue-600 dark:text-blue-400" : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          );
        case "cards":
          return merge(
            "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
            active ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-md" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          );
        default:
          return merge(
            "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
            active ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-md" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          );
      }
    };
    const getSizeClasses = () => {
      switch (size) {
        case "sm":
          return "h-10 px-4 py-2 text-xs";
        case "lg":
          return "h-14 px-6 py-3 text-base";
        default:
          return "h-12 px-5 py-2.5 text-sm";
      }
    };
    const handleClick = () => {
      console.log("TabsTrigger clicked:", value, "onValueChange:", !!onValueChange);
      if (onValueChange) {
        onValueChange(value);
      }
    };
    return /* @__PURE__ */ jsx(
      "button",
      {
        ref,
        className: merge(
          getVariantClasses(),
          getSizeClasses(),
          className
        ),
        onClick: handleClick,
        type: "button",
        ...props,
        children
      }
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";
var TabsPills = React61__default.forwardRef(
  (props, ref) => /* @__PURE__ */ jsx(Tabs, { ref, variant: "pills", ...props })
);
TabsPills.displayName = "TabsPills";
var TabsUnderline = React61__default.forwardRef(
  (props, ref) => /* @__PURE__ */ jsx(Tabs, { ref, variant: "underline", ...props })
);
TabsUnderline.displayName = "TabsUnderline";
var TabsCards = React61__default.forwardRef(
  (props, ref) => /* @__PURE__ */ jsx(Tabs, { ref, variant: "cards", ...props })
);
TabsCards.displayName = "TabsCards";
var Menu2 = React61.forwardRef(
  ({
    className,
    children,
    variant = "default",
    size = "md",
    ...props
  }, ref) => {
    const getVariantClasses = () => {
      switch (variant) {
        case "horizontal":
          return "flex items-center space-x-1";
        // 4px 간격
        case "vertical":
          return "flex flex-col space-y-1";
        // 4px 간격
        case "compact":
          return "flex flex-col space-y-0.5";
        // 2px 간격
        default:
          return "flex flex-col space-y-1";
      }
    };
    const getSizeClasses = () => {
      switch (size) {
        case "sm":
          return "text-sm";
        case "lg":
          return "text-base";
        default:
          return "text-sm";
      }
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          getVariantClasses(),
          getSizeClasses(),
          className
        ),
        ...props,
        children: React61.Children.map(children, (child) => {
          if (React61.isValidElement(child)) {
            return React61.cloneElement(child, {
              variant,
              size
            });
          }
          return child;
        })
      }
    );
  }
);
Menu2.displayName = "Menu";
var MenuItem = React61.forwardRef(
  ({
    className,
    icon,
    variant = "default",
    size = "md",
    active = false,
    disabled = false,
    children,
    ...props
  }, ref) => {
    const getVariantClasses = () => {
      switch (variant) {
        case "horizontal":
          return cn(
            "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
            // 12px, 8px 패딩
            active ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
          );
        case "vertical":
          return cn(
            "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors",
            // 16px, 12px 패딩
            active ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
          );
        case "compact":
          return cn(
            "flex items-center gap-2 px-2 py-1.5 rounded text-sm font-medium transition-colors",
            // 8px, 6px 패딩
            active ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
          );
        default:
          return cn(
            "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors",
            // 16px, 12px 패딩
            active ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
          );
      }
    };
    const getSizeClasses = () => {
      switch (size) {
        case "sm":
          return "text-xs";
        case "lg":
          return "text-base";
        default:
          return "text-sm";
      }
    };
    return /* @__PURE__ */ jsxs(
      "button",
      {
        ref,
        className: cn(
          getVariantClasses(),
          getSizeClasses(),
          disabled && "opacity-50 cursor-not-allowed",
          className
        ),
        disabled,
        ...props,
        children: [
          icon && /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-4 h-4", children: icon }),
          /* @__PURE__ */ jsx("span", { className: "flex-1 text-left", children })
        ]
      }
    );
  }
);
MenuItem.displayName = "MenuItem";
var MenuSeparator = React61.forwardRef(
  ({ className, variant = "default", ...props }, ref) => {
    const getVariantClasses = () => {
      switch (variant) {
        case "horizontal":
          return "w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1";
        // 4px 여백
        case "vertical":
        case "compact":
        default:
          return "h-px bg-gray-200 dark:bg-gray-700 my-2";
      }
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(getVariantClasses(), className),
        ...props
      }
    );
  }
);
MenuSeparator.displayName = "MenuSeparator";
var MenuLabel = React61.forwardRef(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    const getVariantClasses = () => {
      switch (variant) {
        case "horizontal":
          return "px-3 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide";
        // 12px, 4px 패딩
        case "vertical":
        case "compact":
        default:
          return "px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide";
      }
    };
    const getSizeClasses = () => {
      switch (size) {
        case "sm":
          return "text-xs";
        case "lg":
          return "text-sm";
        default:
          return "text-xs";
      }
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          getVariantClasses(),
          getSizeClasses(),
          className
        ),
        ...props,
        children
      }
    );
  }
);
MenuLabel.displayName = "MenuLabel";
var MenuHorizontal = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(Menu2, { ref, variant: "horizontal", className, ...props })
);
MenuHorizontal.displayName = "MenuHorizontal";
var MenuVertical = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(Menu2, { ref, variant: "vertical", className, ...props })
);
MenuVertical.displayName = "MenuVertical";
var MenuCompact = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(Menu2, { ref, variant: "compact", className, ...props })
);
MenuCompact.displayName = "MenuCompact";
var ContextMenu = React61.forwardRef(
  ({
    className,
    children,
    open: controlledOpen,
    onOpenChange,
    trigger,
    placement = "bottom",
    align = "start",
    offset = 8,
    disabled = false,
    ...props
  }, ref) => {
    const [internalOpen, setInternalOpen] = React61.useState(false);
    const [coords, setCoords] = React61.useState({ x: 0, y: 0 });
    const triggerRef = React61.useRef(null);
    const menuRef = React61.useRef(null);
    const isControlled = controlledOpen !== void 0;
    const isOpen = isControlled ? controlledOpen : internalOpen;
    const handleOpenChange = (newOpen) => {
      if (disabled) return;
      if (!isControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange == null ? void 0 : onOpenChange(newOpen);
    };
    const handleContextMenu = (event) => {
      event.preventDefault();
      if (disabled) return;
      event.currentTarget.getBoundingClientRect();
      const x = event.clientX;
      const y = event.clientY;
      setCoords({ x, y });
      handleOpenChange(true);
    };
    const updatePosition = React61.useCallback(() => {
      if (!menuRef.current) return;
      const menuRect = menuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      let x = coords.x;
      let y = coords.y;
      if (x + menuRect.width > viewportWidth - 8) {
        x = viewportWidth - menuRect.width - 8;
      }
      if (y + menuRect.height > viewportHeight - 8) {
        y = viewportHeight - menuRect.height - 8;
      }
      if (x < 8) x = 8;
      if (y < 8) y = 8;
      setCoords({ x, y });
    }, [coords.x, coords.y]);
    React61.useEffect(() => {
      if (isOpen) {
        updatePosition();
        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition);
        return () => {
          window.removeEventListener("resize", updatePosition);
          window.removeEventListener("scroll", updatePosition);
        };
      }
    }, [isOpen, updatePosition]);
    React61.useEffect(() => {
      const handleClickOutside = (event) => {
        if (triggerRef.current && menuRef.current && !triggerRef.current.contains(event.target) && !menuRef.current.contains(event.target)) {
          handleOpenChange(false);
        }
      };
      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }
    }, [isOpen]);
    return /* @__PURE__ */ jsxs("div", { ref, className: cn("relative", className), ...props, children: [
      trigger && /* @__PURE__ */ jsx(
        "div",
        {
          ref: triggerRef,
          onContextMenu: handleContextMenu,
          className: "inline-block",
          children: trigger
        }
      ),
      isOpen && /* @__PURE__ */ jsx(
        "div",
        {
          ref: menuRef,
          className: cn(
            "fixed z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl backdrop-blur-sm",
            // 보더 대신 섀도우 사용
            "min-w-[200px] py-2",
            // 16px 패딩
            "border-0"
            // 보더 제거
          ),
          style: {
            left: coords.x,
            top: coords.y,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          },
          children
        }
      )
    ] });
  }
);
ContextMenu.displayName = "ContextMenu";
var ContextMenuItem = React61.forwardRef(
  ({
    className,
    icon,
    variant = "default",
    children,
    disabled,
    ...props
  }, ref) => {
    const getVariantClasses = () => {
      switch (variant) {
        case "destructive":
          return "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20";
        case "disabled":
          return "text-gray-400 dark:text-gray-500 cursor-not-allowed";
        default:
          return "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700";
      }
    };
    return /* @__PURE__ */ jsxs(
      "button",
      {
        ref,
        className: cn(
          "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700",
          // 16px, 12px 패딩
          getVariantClasses(),
          className
        ),
        disabled: disabled || variant === "disabled",
        ...props,
        children: [
          icon && /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-4 h-4", children: icon }),
          /* @__PURE__ */ jsx("span", { className: "flex-1 text-left", children })
        ]
      }
    );
  }
);
ContextMenuItem.displayName = "ContextMenuItem";
var ContextMenuSeparator = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("h-px bg-gray-200 dark:bg-gray-700 my-2", className),
      ...props
    }
  )
);
ContextMenuSeparator.displayName = "ContextMenuSeparator";
var ContextMenuLabel = React61.forwardRef(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide", className),
      ...props,
      children
    }
  )
);
ContextMenuLabel.displayName = "ContextMenuLabel";
var ContextMenuGroup = React61.forwardRef(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("py-1", className),
      ...props,
      children
    }
  )
);
ContextMenuGroup.displayName = "ContextMenuGroup";
var Command = React61.forwardRef(
  ({
    className,
    children,
    open: controlledOpen,
    onOpenChange,
    placeholder = "\uBA85\uB839\uC5B4\uB97C \uAC80\uC0C9\uD558\uC138\uC694...",
    searchValue: controlledSearchValue,
    onSearchChange,
    disabled = false,
    ...props
  }, ref) => {
    const [internalOpen, setInternalOpen] = React61.useState(false);
    const [internalSearchValue, setInternalSearchValue] = React61.useState("");
    const [selectedIndex, setSelectedIndex] = React61.useState(0);
    const commandRef = React61.useRef(null);
    const inputRef = React61.useRef(null);
    const listRef = React61.useRef(null);
    const isControlled = controlledOpen !== void 0;
    const isOpen = isControlled ? controlledOpen : internalOpen;
    const searchValue = controlledSearchValue !== void 0 ? controlledSearchValue : internalSearchValue;
    const handleOpenChange = (newOpen) => {
      if (disabled) return;
      if (!isControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange == null ? void 0 : onOpenChange(newOpen);
    };
    const handleSearchChange = (value) => {
      if (!isControlled) {
        setInternalSearchValue(value);
      }
      onSearchChange == null ? void 0 : onSearchChange(value);
      setSelectedIndex(0);
    };
    const handleKeyDown = (event) => {
      var _a;
      if (disabled) return;
      const items = (_a = listRef.current) == null ? void 0 : _a.querySelectorAll("[data-command-item]");
      const itemCount = (items == null ? void 0 : items.length) || 0;
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % itemCount);
          break;
        case "ArrowUp":
          event.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + itemCount) % itemCount);
          break;
        case "Enter": {
          event.preventDefault();
          const selectedItem = items == null ? void 0 : items[selectedIndex];
          selectedItem == null ? void 0 : selectedItem.click();
          break;
        }
        case "Escape":
          event.preventDefault();
          handleOpenChange(false);
          break;
      }
    };
    React61.useEffect(() => {
      var _a;
      if (isOpen) {
        (_a = inputRef.current) == null ? void 0 : _a.focus();
        setSelectedIndex(0);
      }
    }, [isOpen]);
    React61.useEffect(() => {
      const handleKeyDown2 = (event) => {
        if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          handleOpenChange(!isOpen);
        }
      };
      document.addEventListener("keydown", handleKeyDown2);
      return () => {
        document.removeEventListener("keydown", handleKeyDown2);
      };
    }, [isOpen]);
    React61.useEffect(() => {
      var _a;
      const selectedItem = (_a = listRef.current) == null ? void 0 : _a.querySelector(`[data-command-item]:nth-child(${selectedIndex + 1})`);
      selectedItem == null ? void 0 : selectedItem.scrollIntoView({ block: "nearest" });
    }, [selectedIndex]);
    return /* @__PURE__ */ jsx("div", { ref, className: cn("relative", className), ...props, children: isOpen && /* @__PURE__ */ jsx(
      "div",
      {
        ref: commandRef,
        className: cn(
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
          // 50% 투명도
          "flex items-start justify-center pt-16"
          // 64px 상단 여백
        ),
        onClick: () => handleOpenChange(false),
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: cn(
              "w-full max-w-2xl mx-4 bg-white dark:bg-gray-800 rounded-lg shadow-2xl",
              // 보더 대신 섀도우
              "border-0 overflow-hidden"
              // 보더 제거
            ),
            onClick: (e) => e.stopPropagation(),
            style: {
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            },
            children: [
              /* @__PURE__ */ jsxs("div", { className: "p-4 border-b border-gray-200 dark:border-gray-700", children: [
                " ",
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    ref: inputRef,
                    type: "text",
                    placeholder,
                    value: searchValue,
                    onChange: (e) => handleSearchChange(e.target.value),
                    onKeyDown: handleKeyDown,
                    className: cn(
                      "w-full bg-transparent text-lg font-medium outline-none",
                      // 18px 텍스트
                      "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                      "text-gray-900 dark:text-gray-100"
                    )
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  ref: listRef,
                  className: "max-h-96 overflow-y-auto py-2",
                  children: React61.Children.map(children, (child, index) => {
                    if (React61.isValidElement(child)) {
                      return React61.cloneElement(child, {
                        selected: index === selectedIndex,
                        onSelect: () => {
                          var _a, _b;
                          (_b = (_a = child.props) == null ? void 0 : _a.onSelect) == null ? void 0 : _b.call(_a);
                          handleOpenChange(false);
                        }
                      });
                    }
                    return child;
                  })
                }
              )
            ]
          }
        )
      }
    ) });
  }
);
Command.displayName = "Command";
var CommandInput = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "input",
    {
      ref,
      className: cn(
        "flex h-10 w-full rounded-md bg-transparent px-3 py-2 text-sm outline-none",
        // 40px 높이, 12px, 8px 패딩
        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props
    }
  )
);
CommandInput.displayName = "CommandInput";
var CommandList = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("max-h-96 overflow-y-auto py-2", className),
      ...props
    }
  )
);
CommandList.displayName = "CommandList";
var CommandItem = React61.forwardRef(
  ({
    className,
    icon,
    selected = false,
    onSelect,
    children,
    ...props
  }, ref) => {
    return /* @__PURE__ */ jsxs(
      "button",
      {
        ref,
        "data-command-item": true,
        className: cn(
          "relative flex w-full items-center gap-3 rounded-sm px-4 py-3 text-sm",
          // 16px, 12px 패딩
          "text-gray-700 dark:text-gray-300",
          "hover:bg-gray-100 dark:hover:bg-gray-700",
          "focus:bg-gray-100 dark:focus:bg-gray-700",
          "focus:outline-none",
          selected && "bg-gray-100 dark:bg-gray-700",
          "transition-colors",
          className
        ),
        onClick: onSelect,
        ...props,
        children: [
          icon && /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-4 h-4 text-gray-500 dark:text-gray-400", children: icon }),
          /* @__PURE__ */ jsx("span", { className: "flex-1 text-left", children })
        ]
      }
    );
  }
);
CommandItem.displayName = "CommandItem";
var CommandGroup = React61.forwardRef(
  ({ className, heading, children, ...props }, ref) => /* @__PURE__ */ jsxs("div", { ref, className: cn("py-2", className), ...props, children: [
    " ",
    heading && /* @__PURE__ */ jsxs("div", { className: "px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide", children: [
      " ",
      heading
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
      " ",
      children
    ] })
  ] })
);
CommandGroup.displayName = "CommandGroup";
var CommandSeparator = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("h-px bg-gray-200 dark:bg-gray-700 my-2", className),
      ...props
    }
  )
);
CommandSeparator.displayName = "CommandSeparator";
var CommandEmpty = React61.forwardRef(
  ({ className, children = "\uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.", ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn(
        "py-8 text-center text-sm text-gray-500 dark:text-gray-400",
        // 32px 패딩
        className
      ),
      ...props,
      children
    }
  )
);
CommandEmpty.displayName = "CommandEmpty";
var CommandDialog = React61.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(Command, { ref, className, ...props })
);
CommandDialog.displayName = "CommandDialog";
var Bookmark2 = React61__default.forwardRef(
  ({
    className,
    id,
    storageKey = "bookmarks",
    defaultBookmarked = false,
    onBookmarkChange,
    size = "md",
    variant = "default",
    ...props
  }, ref) => {
    const [isBookmarked, setIsBookmarked] = useState(defaultBookmarked);
    useEffect(() => {
      const savedBookmarks = localStorage.getItem(storageKey);
      if (savedBookmarks) {
        const bookmarks = JSON.parse(savedBookmarks);
        setIsBookmarked(bookmarks.includes(id));
      }
    }, [id, storageKey]);
    const toggleBookmark = () => {
      const newBookmarked = !isBookmarked;
      setIsBookmarked(newBookmarked);
      const savedBookmarks = localStorage.getItem(storageKey);
      const bookmarks = savedBookmarks ? JSON.parse(savedBookmarks) : [];
      if (newBookmarked) {
        if (!bookmarks.includes(id)) {
          bookmarks.push(id);
        }
      } else {
        const index = bookmarks.indexOf(id);
        if (index > -1) {
          bookmarks.splice(index, 1);
        }
      }
      localStorage.setItem(storageKey, JSON.stringify(bookmarks));
      onBookmarkChange == null ? void 0 : onBookmarkChange(newBookmarked);
    };
    const sizeClasses2 = {
      sm: "w-6 h-6",
      md: "w-8 h-8",
      lg: "w-10 h-10"
    };
    const variantClasses = {
      default: "text-slate-400 hover:text-yellow-500 transition-colors",
      filled: "text-yellow-500 hover:text-yellow-600 transition-colors",
      outline: "border border-slate-300 dark:border-slate-600 text-slate-400 hover:text-yellow-500 hover:border-yellow-500 transition-colors rounded"
    };
    return /* @__PURE__ */ jsx(
      "button",
      {
        ref,
        onClick: toggleBookmark,
        className: cn(
          "flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2",
          sizeClasses2[size],
          variantClasses[variant],
          className
        ),
        ...props,
        children: /* @__PURE__ */ jsx(
          Icon,
          {
            name: "star",
            className: cn(
              "transition-all duration-200",
              isBookmarked && "fill-current"
            )
          }
        )
      }
    );
  }
);
Bookmark2.displayName = "Bookmark";
var ChatMessage = React61.forwardRef(
  ({
    className,
    message,
    user = { name: "\uC0AC\uC6A9\uC790", color: "#3b82f6" },
    assistant = { name: "AI", color: "#10b981" },
    showAvatar = true,
    showTimestamp = true,
    showEmotion = true,
    variant = "default",
    theme = {
      userBubbleBg: "#3b82f6",
      userBubbleText: "#ffffff",
      aiBubbleBg: "#f3f4f6",
      aiBubbleText: "#1f2937"
    },
    ...props
  }, ref) => {
    var _a, _b, _c;
    const isUser = message.role === "user";
    message.role === "assistant";
    message.role === "system";
    const getEmotionColor = (emotion) => {
      if (!emotion) return "bg-gray-100";
      const emotionColors = {
        joy: "bg-yellow-100 text-yellow-800",
        sadness: "bg-blue-100 text-blue-800",
        anger: "bg-red-100 text-red-800",
        calm: "bg-green-100 text-green-800",
        excitement: "bg-pink-100 text-pink-800",
        worry: "bg-gray-100 text-gray-800",
        gratitude: "bg-purple-100 text-purple-800",
        loneliness: "bg-indigo-100 text-indigo-800"
      };
      return emotionColors[emotion] || "bg-gray-100 text-gray-800";
    };
    const formatTime = (date) => {
      return date.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    if (variant === "bubble") {
      return /* @__PURE__ */ jsx(
        "div",
        {
          ref,
          className: cn(
            "flex w-full",
            isUser ? "justify-end" : "justify-start",
            className
          ),
          ...props,
          children: /* @__PURE__ */ jsxs("div", { className: cn(
            "flex max-w-[80%] space-x-2",
            isUser ? "flex-row-reverse space-x-reverse" : "flex-row"
          ), children: [
            showAvatar && /* @__PURE__ */ jsxs(Avatar, { className: "w-8 h-8 flex-shrink-0", children: [
              /* @__PURE__ */ jsx(
                AvatarImage,
                {
                  src: isUser ? user.avatar : assistant.avatar,
                  alt: isUser ? user.name : assistant.name
                }
              ),
              /* @__PURE__ */ jsx(
                AvatarFallback,
                {
                  style: {
                    backgroundColor: isUser ? user.color : assistant.color
                  },
                  children: (_a = isUser ? user.name : assistant.name) == null ? void 0 : _a.charAt(0)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: cn(
                    "px-4 py-2 rounded-2xl max-w-full break-words",
                    isUser ? "rounded-br-md" : "rounded-bl-md"
                  ),
                  style: {
                    backgroundColor: isUser ? theme.userBubbleBg : theme.aiBubbleBg,
                    color: isUser ? theme.userBubbleText : theme.aiBubbleText
                  },
                  children: message.isTyping ? /* @__PURE__ */ jsxs("div", { className: "flex space-x-1", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-current rounded-full animate-bounce" }),
                    /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-current rounded-full animate-bounce delay-100" }),
                    /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-current rounded-full animate-bounce delay-200" })
                  ] }) : /* @__PURE__ */ jsx("div", { className: "whitespace-pre-wrap", children: message.content })
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: cn(
                "flex items-center space-x-2 text-xs text-muted-foreground",
                isUser ? "justify-end" : "justify-start"
              ), children: [
                showTimestamp && /* @__PURE__ */ jsx("span", { children: formatTime(message.timestamp) }),
                showEmotion && message.emotion && /* @__PURE__ */ jsx(
                  Badge,
                  {
                    variant: "secondary",
                    className: cn("text-xs", getEmotionColor(message.emotion)),
                    children: message.emotion
                  }
                )
              ] })
            ] })
          ] })
        }
      );
    }
    if (variant === "compact") {
      return /* @__PURE__ */ jsxs(
        "div",
        {
          ref,
          className: cn(
            "flex items-start space-x-3 py-2",
            className
          ),
          ...props,
          children: [
            showAvatar && /* @__PURE__ */ jsxs(Avatar, { className: "w-6 h-6 flex-shrink-0", children: [
              /* @__PURE__ */ jsx(
                AvatarImage,
                {
                  src: isUser ? user.avatar : assistant.avatar,
                  alt: isUser ? user.name : assistant.name
                }
              ),
              /* @__PURE__ */ jsx(
                AvatarFallback,
                {
                  style: {
                    backgroundColor: isUser ? user.color : assistant.color
                  },
                  children: (_b = isUser ? user.name : assistant.name) == null ? void 0 : _b.charAt(0)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 mb-1", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: isUser ? user.name : assistant.name }),
                showTimestamp && /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: formatTime(message.timestamp) }),
                showEmotion && message.emotion && /* @__PURE__ */ jsx(
                  Badge,
                  {
                    variant: "secondary",
                    className: cn("text-xs", getEmotionColor(message.emotion)),
                    children: message.emotion
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-sm", children: message.isTyping ? /* @__PURE__ */ jsxs("div", { className: "flex space-x-1", children: [
                /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" }),
                /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce delay-100" }),
                /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce delay-200" })
              ] }) : /* @__PURE__ */ jsx("div", { className: "whitespace-pre-wrap", children: message.content }) })
            ] })
          ]
        }
      );
    }
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: cn(
          "flex items-start space-x-3 py-4",
          className
        ),
        ...props,
        children: [
          showAvatar && /* @__PURE__ */ jsxs(Avatar, { className: "w-10 h-10 flex-shrink-0", children: [
            /* @__PURE__ */ jsx(
              AvatarImage,
              {
                src: isUser ? user.avatar : assistant.avatar,
                alt: isUser ? user.name : assistant.name
              }
            ),
            /* @__PURE__ */ jsx(
              AvatarFallback,
              {
                style: {
                  backgroundColor: isUser ? user.color : assistant.color
                },
                children: (_c = isUser ? user.name : assistant.name) == null ? void 0 : _c.charAt(0)
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: isUser ? user.name : assistant.name }),
              showTimestamp && /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: formatTime(message.timestamp) }),
              showEmotion && message.emotion && /* @__PURE__ */ jsx(
                Badge,
                {
                  variant: "secondary",
                  className: cn("text-xs", getEmotionColor(message.emotion)),
                  children: message.emotion
                }
              )
            ] }),
            /* @__PURE__ */ jsx(Card, { className: cn(
              "inline-block",
              isUser ? "bg-primary text-primary-foreground" : "bg-muted"
            ), children: /* @__PURE__ */ jsx(CardContent, { className: "p-3", children: message.isTyping ? /* @__PURE__ */ jsxs("div", { className: "flex space-x-1", children: [
              /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-current rounded-full animate-bounce" }),
              /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-current rounded-full animate-bounce delay-100" }),
              /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-current rounded-full animate-bounce delay-200" })
            ] }) : /* @__PURE__ */ jsx("div", { className: "whitespace-pre-wrap", children: message.content }) }) })
          ] })
        ]
      }
    );
  }
);
ChatMessage.displayName = "ChatMessage";
var ComponentLayout = React61__default.forwardRef(
  ({
    className,
    title,
    description,
    children,
    prevPage,
    nextPage,
    breadcrumbItems = [
      { label: "Components", href: "/components" }
    ],
    ...props
  }, ref) => {
    return /* @__PURE__ */ jsxs("div", { className: "relative min-h-screen", children: [
      /* @__PURE__ */ jsx("div", { className: "fixed right-4 top-4 z-50 hidden lg:block", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col space-y-4", children: prevPage && /* @__PURE__ */ jsx(
        "a",
        {
          href: prevPage.href,
          className: "group p-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full shadow-lg hover:shadow-2xl hover:bg-white/90 active:scale-95 transition-all duration-200",
          title: `\uC774\uC804: ${prevPage.title}`,
          children: /* @__PURE__ */ jsx(
            "svg",
            {
              className: "w-5 h-5 text-slate-600 group-hover:text-blue-600 group-active:text-blue-800 transition-colors",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 15l7-7 7 7" })
            }
          )
        }
      ) }) }),
      /* @__PURE__ */ jsx("div", { className: "fixed right-4 bottom-4 z-50 hidden lg:block", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col space-y-4", children: nextPage && /* @__PURE__ */ jsx(
        "a",
        {
          href: nextPage.href,
          className: "group p-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full shadow-lg hover:shadow-2xl hover:bg-white/90 active:scale-95 transition-all duration-200",
          title: `\uB2E4\uC74C: ${nextPage.title}`,
          children: /* @__PURE__ */ jsx(
            "svg",
            {
              className: "w-5 h-5 text-slate-600 group-hover:text-blue-600 group-active:text-blue-800 transition-colors",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" })
            }
          )
        }
      ) }) }),
      /* @__PURE__ */ jsx(
        "div",
        {
          ref,
          className: cn("container mx-auto px-4 py-8", className),
          ...props,
          children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
            /* @__PURE__ */ jsx(Breadcrumb, { className: "mb-6", children: breadcrumbItems.map((item, index) => /* @__PURE__ */ jsx(
              BreadcrumbItem,
              {
                href: item.href,
                isCurrent: index === breadcrumbItems.length - 1,
                children: item.label
              },
              index
            )) }),
            /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
              /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-4", children: title }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-slate-600 dark:text-slate-400", children: description })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-8", children }),
            /* @__PURE__ */ jsx("div", { className: "mt-12 lg:hidden", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-4 border-t border-slate-200 dark:border-slate-700", children: [
              prevPage && /* @__PURE__ */ jsxs(
                "a",
                {
                  href: prevPage.href,
                  className: "flex items-center text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors",
                  children: [
                    /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) }),
                    prevPage.title
                  ]
                }
              ),
              nextPage && /* @__PURE__ */ jsxs(
                "a",
                {
                  href: nextPage.href,
                  className: "flex items-center text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors",
                  children: [
                    nextPage.title,
                    /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 ml-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
                  ]
                }
              )
            ] }) })
          ] })
        }
      )
    ] });
  }
);
ComponentLayout.displayName = "ComponentLayout";
var EmotionMeter = React61.forwardRef(
  ({ className, value, max = 100, size = "md", color = "blue", ...props }, ref) => {
    const sizeClasses2 = {
      sm: "h-2",
      md: "h-3",
      lg: "h-4"
    };
    const colorClasses5 = {
      blue: "bg-blue-500",
      green: "bg-green-500",
      yellow: "bg-yellow-500",
      red: "bg-red-500"
    };
    const percentage = Math.min(Math.max(value / max * 100, 0), 100);
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          "w-full bg-gray-200 rounded-full dark:bg-gray-700",
          sizeClasses2[size],
          className
        ),
        ...props,
        children: /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "h-full rounded-full transition-all duration-300",
              colorClasses5[color]
            ),
            style: { width: `${percentage}%` }
          }
        )
      }
    );
  }
);
EmotionMeter.displayName = "EmotionMeter";
var EmotionAnalysis = React61.forwardRef(
  ({
    className,
    primaryEmotion,
    emotionDistribution = [],
    keywords = [],
    intensity = 50,
    positivity = 70,
    energy = 60,
    showMeter = true,
    showDistribution = true,
    showKeywords = true,
    showMetrics = true,
    layout = "detailed",
    ...props
  }, ref) => {
    const getIntensityLabel = (value) => {
      if (value < 30) return "\uC57D\uD568";
      if (value < 70) return "\uBCF4\uD1B5";
      return "\uAC15\uD568";
    };
    const getPositivityLabel = (value) => {
      if (value < 30) return "\uBD80\uC815\uC801";
      if (value < 70) return "\uC911\uB9BD\uC801";
      return "\uAE0D\uC815\uC801";
    };
    const getEnergyLabel = (value) => {
      if (value < 30) return "\uB0AE\uC74C";
      if (value < 70) return "\uBCF4\uD1B5";
      return "\uB192\uC74C";
    };
    if (layout === "compact") {
      return /* @__PURE__ */ jsxs(
        "div",
        {
          ref,
          className: cn("space-y-3", className),
          ...props,
          children: [
            primaryEmotion && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "\uC8FC\uC694 \uAC10\uC815:" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-sm text-muted-foreground", children: [
                  primaryEmotion.name,
                  " (",
                  primaryEmotion.intensity,
                  "%)"
                ] }),
                showMeter && /* @__PURE__ */ jsx(
                  EmotionMeter,
                  {
                    value: primaryEmotion.intensity,
                    size: "sm",
                    color: "blue"
                  }
                )
              ] })
            ] }),
            showMetrics && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "\uAC10\uC815 \uAC15\uB3C4:" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: getIntensityLabel(intensity) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "\uAE0D\uC815\uC131:" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: getPositivityLabel(positivity) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "\uC5D0\uB108\uC9C0:" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: getEnergyLabel(energy) })
              ] })
            ] }),
            showKeywords && keywords.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "\uD0A4\uC6CC\uB4DC:" }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1 mt-1", children: keywords.map((keyword) => /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "text-xs", children: keyword }, keyword)) })
            ] })
          ]
        }
      );
    }
    if (layout === "card") {
      return /* @__PURE__ */ jsxs(
        Card,
        {
          ref,
          className: cn("", className),
          ...props,
          children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center", children: [
                /* @__PURE__ */ jsx("span", { className: "text-2xl mr-2", children: "\u2728" }),
                "AI \uBD84\uC11D"
              ] }),
              /* @__PURE__ */ jsx(CardDescription, { children: "\uAC10\uC815 \uBD84\uC11D \uACB0\uACFC" })
            ] }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
              primaryEmotion && /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: "\uC8FC\uC694 \uAC10\uC815:" }),
                  /* @__PURE__ */ jsxs("span", { className: "ml-2 text-muted-foreground", children: [
                    primaryEmotion.name,
                    " (",
                    primaryEmotion.intensity,
                    "%)"
                  ] })
                ] }),
                showMeter && /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
                  EmotionMeter,
                  {
                    value: primaryEmotion.intensity,
                    size: "md",
                    color: "blue"
                  }
                ) })
              ] }),
              showMetrics && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: "\uAC10\uC815 \uAC15\uB3C4:" }),
                  /* @__PURE__ */ jsx("span", { className: "ml-2 text-muted-foreground", children: getIntensityLabel(intensity) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: "\uAE0D\uC815\uC131:" }),
                  /* @__PURE__ */ jsx("span", { className: "ml-2 text-muted-foreground", children: getPositivityLabel(positivity) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: "\uC5D0\uB108\uC9C0:" }),
                  /* @__PURE__ */ jsx("span", { className: "ml-2 text-muted-foreground", children: getEnergyLabel(energy) })
                ] })
              ] }),
              showKeywords && keywords.length > 0 && /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
                /* @__PURE__ */ jsx("span", { className: "font-medium", children: "\uD0A4\uC6CC\uB4DC:" }),
                /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1 mt-1", children: keywords.map((keyword) => /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "text-xs", children: keyword }, keyword)) })
              ] })
            ] })
          ]
        }
      );
    }
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: cn("space-y-6", className),
        ...props,
        children: [
          primaryEmotion && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "\uC8FC\uC694 \uAC10\uC815" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-primary", children: primaryEmotion.name }),
                /* @__PURE__ */ jsxs("div", { className: "text-sm text-muted-foreground", children: [
                  primaryEmotion.intensity,
                  "% \uAC15\uB3C4"
                ] })
              ] }),
              showMeter && /* @__PURE__ */ jsx(
                EmotionMeter,
                {
                  value: primaryEmotion.intensity,
                  size: "lg",
                  color: "blue"
                }
              )
            ] })
          ] }),
          showDistribution && emotionDistribution.length > 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "\uAC10\uC815 \uBD84\uD3EC" }),
            /* @__PURE__ */ jsx("div", { className: "space-y-3", children: emotionDistribution.map((item, index) => /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: item.emotion }),
                /* @__PURE__ */ jsxs("span", { className: "text-sm text-muted-foreground", children: [
                  item.percentage,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "w-full bg-muted rounded-full h-2", children: /* @__PURE__ */ jsx(
                "div",
                {
                  className: `${item.color} h-2 rounded-full transition-all duration-300`,
                  style: { width: `${item.percentage}%` }
                }
              ) })
            ] }, index)) })
          ] }),
          showMetrics && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "\uBD84\uC11D \uC9C0\uD45C" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: "\uAC10\uC815 \uAC15\uB3C4" }),
                /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-primary", children: getIntensityLabel(intensity) }),
                /* @__PURE__ */ jsx("div", { className: "w-full bg-muted rounded-full h-2", children: /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "bg-primary h-2 rounded-full transition-all duration-300",
                    style: { width: `${intensity}%` }
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: "\uAE0D\uC815\uC131" }),
                /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-green-600", children: getPositivityLabel(positivity) }),
                /* @__PURE__ */ jsx("div", { className: "w-full bg-muted rounded-full h-2", children: /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "bg-green-500 h-2 rounded-full transition-all duration-300",
                    style: { width: `${positivity}%` }
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: "\uC5D0\uB108\uC9C0" }),
                /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-orange-600", children: getEnergyLabel(energy) }),
                /* @__PURE__ */ jsx("div", { className: "w-full bg-muted rounded-full h-2", children: /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "bg-orange-500 h-2 rounded-full transition-all duration-300",
                    style: { width: `${energy}%` }
                  }
                ) })
              ] })
            ] })
          ] }),
          showKeywords && keywords.length > 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "\uAC10\uC815 \uD0A4\uC6CC\uB4DC" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: keywords.map((keyword) => /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-sm", children: keyword }, keyword)) })
          ] })
        ]
      }
    );
  }
);
EmotionAnalysis.displayName = "EmotionAnalysis";
var EmotionButton = React61.forwardRef(
  ({ className, emotion, isSelected = false, size = "md", ...props }, ref) => {
    const sizeClasses2 = {
      sm: "w-8 h-8 text-sm",
      md: "w-12 h-12 text-lg",
      lg: "w-16 h-16 text-xl"
    };
    return /* @__PURE__ */ jsx(
      "button",
      {
        ref,
        className: cn(
          "rounded-full border-2 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500",
          sizeClasses2[size],
          isSelected ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800",
          className
        ),
        ...props,
        children: emotion
      }
    );
  }
);
EmotionButton.displayName = "EmotionButton";
var defaultEmotions = [
  { key: "joy", label: "\uAE30\uC068", icon: "smile", color: "yellow" },
  { key: "sadness", label: "\uC2AC\uD514", icon: "frown", color: "blue" },
  { key: "anger", label: "\uD654\uB0A8", icon: "angry", color: "red" },
  { key: "calm", label: "\uD3C9\uC628", icon: "heart", color: "green" },
  { key: "excitement", label: "\uC124\uB818", icon: "star", color: "pink" },
  { key: "worry", label: "\uAC71\uC815", icon: "meh", color: "gray" },
  { key: "gratitude", label: "\uAC10\uC0AC", icon: "heart", color: "purple" },
  { key: "loneliness", label: "\uC678\uB85C\uC6C0", icon: "user", color: "indigo" }
];
var EmotionSelector = React61.forwardRef(
  ({
    className,
    selectedEmotion,
    onEmotionSelect,
    layout = "grid",
    showIntensity = false,
    intensity = 50,
    onIntensityChange,
    emotions = defaultEmotions,
    size = "md",
    variant = "button",
    ...props
  }, ref) => {
    const handleEmotionClick = (emotionKey) => {
      onEmotionSelect == null ? void 0 : onEmotionSelect(emotionKey);
    };
    const renderEmotionItem = (emotion) => {
      const isSelected = selectedEmotion === emotion.key;
      if (variant === "button") {
        return /* @__PURE__ */ jsx(
          EmotionButton,
          {
            emotion: emotion.key,
            isSelected,
            size,
            onClick: () => handleEmotionClick(emotion.key),
            className: cn(
              "transition-all duration-200",
              isSelected && "ring-2 ring-offset-2 ring-primary"
            ),
            children: emotion.label
          },
          emotion.key
        );
      }
      if (variant === "card") {
        return /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md",
              isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            ),
            onClick: () => handleEmotionClick(emotion.key),
            children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ jsx("div", { className: cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
              ), children: emotion.icon && /* @__PURE__ */ jsxs("span", { className: "text-lg", children: [
                emotion.icon === "smile" && "\u{1F60A}",
                emotion.icon === "frown" && "\u{1F622}",
                emotion.icon === "angry" && "\u{1F620}",
                emotion.icon === "heart" && "\u2764\uFE0F",
                emotion.icon === "star" && "\u2B50",
                emotion.icon === "meh" && "\u{1F610}",
                emotion.icon === "user" && "\u{1F464}"
              ] }) }),
              /* @__PURE__ */ jsx("span", { className: "font-medium truncate max-w-[120px]", children: emotion.label })
            ] })
          },
          emotion.key
        );
      }
      if (variant === "chip") {
        return /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "px-3 py-1 rounded-full cursor-pointer transition-all duration-200 text-sm font-medium",
              isSelected ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
            ),
            onClick: () => handleEmotionClick(emotion.key),
            children: /* @__PURE__ */ jsx("span", { className: "truncate max-w-[100px]", children: emotion.label })
          },
          emotion.key
        );
      }
      return null;
    };
    const layoutClasses = {
      grid: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3",
      list: "space-y-2",
      compact: "flex flex-wrap gap-1"
    };
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: cn("space-y-4", className),
        ...props,
        children: [
          /* @__PURE__ */ jsx("div", { className: layoutClasses[layout], children: emotions.map(renderEmotionItem) }),
          showIntensity && selectedEmotion && /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "\uAC10\uC815 \uAC15\uB3C4" }),
              /* @__PURE__ */ jsxs("span", { className: "text-sm text-muted-foreground", children: [
                intensity,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "range",
                min: "0",
                max: "100",
                value: intensity,
                onChange: (e) => onIntensityChange == null ? void 0 : onIntensityChange(Number(e.target.value)),
                className: "w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsx("span", { children: "\uC57D\uD568" }),
              /* @__PURE__ */ jsx("span", { children: "\uBCF4\uD1B5" }),
              /* @__PURE__ */ jsx("span", { children: "\uAC15\uD568" })
            ] })
          ] }),
          selectedEmotion && showIntensity && /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
            EmotionMeter,
            {
              value: intensity,
              size: "md",
              color: "blue"
            }
          ) })
        ]
      }
    );
  }
);
EmotionSelector.displayName = "EmotionSelector";
var LanguageToggle = React61.forwardRef(
  ({
    className,
    size = "md",
    variant = "button",
    showLabel = false,
    languages = [
      { code: "ko", name: "\uD55C\uAD6D\uC5B4", flag: "\u{1F1F0}\u{1F1F7}" },
      { code: "en", name: "English", flag: "\u{1F1FA}\u{1F1F8}" },
      { code: "ja", name: "\u65E5\u672C\u8A9E", flag: "\u{1F1EF}\u{1F1F5}" },
      { code: "zh", name: "\u4E2D\u6587", flag: "\u{1F1E8}\u{1F1F3}" }
    ],
    currentLanguage = "ko",
    onLanguageChange,
    ...props
  }, ref) => {
    const [isOpen, setIsOpen] = React61.useState(false);
    const dropdownRef = React61.useRef(null);
    const currentLang = languages.find((lang) => lang.code === currentLanguage) || languages[0];
    const sizeClasses2 = {
      sm: "h-10 w-10",
      // 40px - 더 넉넉한 크기
      md: "h-12 w-12",
      // 48px - 더 넉넉한 크기
      lg: "h-14 w-14"
      // 56px - 더 넉넉한 크기
    };
    React61.useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);
    const handleLanguageChange = (languageCode) => {
      onLanguageChange == null ? void 0 : onLanguageChange(languageCode);
      setIsOpen(false);
    };
    const renderIcon = () => /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-lg", children: currentLang.flag }) });
    if (variant === "icon") {
      return /* @__PURE__ */ jsxs("div", { ref: dropdownRef, className: "relative", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setIsOpen(!isOpen),
            className: cn(
              "inline-flex items-center justify-center rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2",
              sizeClasses2[size],
              className
            ),
            ...props,
            children: renderIcon()
          }
        ),
        isOpen && /* @__PURE__ */ jsx("div", { className: "absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50", children: languages.map((language) => /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleLanguageChange(language.code),
            className: cn(
              "w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center gap-3",
              // 16px, 12px 패딩, 12px 간격
              currentLanguage === language.code && "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
            ),
            children: [
              /* @__PURE__ */ jsx("span", { className: "text-lg", children: language.flag }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: language.name })
            ]
          },
          language.code
        )) })
      ] });
    }
    if (variant === "dropdown") {
      return /* @__PURE__ */ jsxs("div", { ref: dropdownRef, className: "relative", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setIsOpen(!isOpen),
            className: cn(
              "inline-flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2",
              // 12px 간격, 16px, 12px 패딩
              className
            ),
            ...props,
            children: [
              /* @__PURE__ */ jsx("span", { className: "text-lg", children: currentLang.flag }),
              showLabel && /* @__PURE__ */ jsx("span", { children: currentLang.name }),
              /* @__PURE__ */ jsx(
                "svg",
                {
                  className: cn(
                    "w-4 h-4 transition-transform duration-200",
                    isOpen && "rotate-180"
                  ),
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" })
                }
              )
            ]
          }
        ),
        isOpen && /* @__PURE__ */ jsx("div", { className: "absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50", children: languages.map((language) => /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleLanguageChange(language.code),
            className: cn(
              "w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center gap-3",
              // 16px, 12px 패딩, 12px 간격
              currentLanguage === language.code && "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
            ),
            children: [
              /* @__PURE__ */ jsx("span", { className: "text-lg", children: language.flag }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: language.name })
            ]
          },
          language.code
        )) })
      ] });
    }
    return /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => {
          const currentIndex = languages.findIndex((lang) => lang.code === currentLanguage);
          const nextIndex = (currentIndex + 1) % languages.length;
          onLanguageChange == null ? void 0 : onLanguageChange(languages[nextIndex].code);
        },
        className: cn(
          "inline-flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2",
          // 12px 간격, 16px, 12px 패딩
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsx("span", { className: "text-lg", children: currentLang.flag }),
          showLabel && /* @__PURE__ */ jsx("span", { children: currentLang.name })
        ]
      }
    );
  }
);
LanguageToggle.displayName = "LanguageToggle";
var ScrollArea = React61.forwardRef(
  ({
    children,
    className,
    orientation = "vertical",
    scrollHideDelay = 600,
    type = "hover",
    ...props
  }, ref) => {
    const [showScrollbar, setShowScrollbar] = React61.useState(false);
    const timeoutRef = React61.useRef(void 0);
    const handleMouseEnter = () => {
      if (type === "hover" || type === "always") {
        setShowScrollbar(true);
      }
    };
    const handleMouseLeave = () => {
      if (type === "hover") {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          setShowScrollbar(false);
        }, scrollHideDelay);
      }
    };
    React61.useEffect(() => {
      if (type === "always") {
        setShowScrollbar(true);
      }
    }, [type]);
    React61.useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          "relative overflow-auto scrollbar-thin",
          orientation === "vertical" && "overflow-y-auto overflow-x-hidden",
          orientation === "horizontal" && "overflow-x-auto overflow-y-hidden",
          orientation === "both" && "overflow-auto",
          showScrollbar ? "scrollbar-visible" : "scrollbar-hidden",
          className
        ),
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        ...props,
        children
      }
    );
  }
);
ScrollArea.displayName = "ScrollArea";
var ScrollBar = React61.forwardRef(
  ({ orientation = "vertical", className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          "flex touch-none select-none transition-colors duration-150 ease-out",
          orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
          orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
          className
        ),
        ...props
      }
    );
  }
);
ScrollBar.displayName = "ScrollBar";
var ScrollIndicator = React61__default.forwardRef(({
  className,
  targetId,
  text = "Scroll down",
  iconName = "arrowDown",
  iconSize = 20,
  position = "bottom-center",
  variant = "default",
  size = "md",
  animated = true,
  autoHide = true,
  hideThreshold = 100,
  ...props
}, ref) => {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    if (!autoHide) return;
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsVisible(scrollTop < hideThreshold);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [autoHide, hideThreshold]);
  const scrollToTarget = () => {
    if (targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      const currentSection = ref;
      if (currentSection.current) {
        const nextSection = currentSection.current.nextElementSibling;
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };
  const positionClasses = {
    "bottom-center": "bottom-8 left-1/2 transform -translate-x-1/2",
    "bottom-left": "bottom-8 left-8",
    "bottom-right": "bottom-8 right-8"
  };
  const sizeClasses2 = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };
  const variantClasses = {
    default: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white",
    primary: "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200",
    secondary: "text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200",
    outline: "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
  };
  if (!isVisible) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn(
        "absolute z-10",
        positionClasses[position],
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxs(
        Button,
        {
          onClick: scrollToTarget,
          variant: "ghost",
          size: "sm",
          className: cn(
            "flex flex-col items-center space-y-2 transition-all duration-300",
            sizeClasses2[size],
            variantClasses[variant],
            animated && "animate-in fade-in-0 slide-in-from-bottom-2 duration-500"
          ),
          "aria-label": text,
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs opacity-80", children: text }),
            /* @__PURE__ */ jsx(
              Icon,
              {
                name: iconName,
                size: iconSize,
                className: cn(
                  animated && "animate-bounce"
                )
              }
            )
          ]
        }
      )
    }
  );
});
ScrollIndicator.displayName = "ScrollIndicator";
var ScrollProgress = React61__default.forwardRef(({
  className,
  height = 2,
  color = "gradient",
  position = "top",
  animated = true,
  showPercentage = false,
  ...props
}, ref) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = docHeight > 0 ? scrollTop / docHeight * 100 : 0;
      setProgress(currentProgress);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);
  const colorClasses5 = {
    default: "bg-blue-600",
    primary: "bg-purple-600",
    secondary: "bg-gray-600",
    gradient: "bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600"
  };
  const positionClasses = {
    top: "top-0 left-0 right-0",
    bottom: "bottom-0 left-0 right-0"
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cn(
        "fixed z-50",
        positionClasses[position],
        className
      ),
      style: { height: `${height}px` },
      ...props,
      children: [
        /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-gray-200 dark:bg-gray-700" }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "h-full origin-left transition-all duration-100 ease-out",
              colorClasses5[color]
            ),
            style: {
              width: `${progress}%`,
              transformOrigin: "left"
            }
          }
        ),
        showPercentage && /* @__PURE__ */ jsxs("div", { className: "absolute top-2 right-2 text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 px-2 py-1 rounded", children: [
          Math.round(progress),
          "%"
        ] })
      ]
    }
  );
});
ScrollProgress.displayName = "ScrollProgress";
function useScrollToggle(options = {}) {
  const {
    threshold = 400,
    showOnMount = false,
    smooth = true
  } = options;
  const [isVisible, setIsVisible] = useState(showOnMount);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!mounted) return;
    const toggleVisibility = () => {
      if (typeof window === "undefined") return;
      setIsVisible(window.pageYOffset > threshold);
    };
    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    window.addEventListener("resize", toggleVisibility, { passive: true });
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("resize", toggleVisibility);
    };
  }, [threshold, mounted]);
  const scrollToTop = () => {
    if (typeof window === "undefined") return;
    if (smooth) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo(0, 0);
    }
  };
  return {
    isVisible,
    scrollToTop,
    mounted
  };
}
var ScrollToTop = ({
  className,
  threshold = 400,
  smooth = true,
  icon = "arrowUp",
  size = "md",
  variant = "default",
  showOnMount = false,
  ...props
}) => {
  const { isVisible, scrollToTop} = useScrollToggle({
    threshold,
    showOnMount,
    smooth
  });
  const sizeClasses2 = {
    sm: "w-8 h-8 sm:w-10 sm:h-10",
    md: "w-10 h-10 sm:w-12 sm:h-12",
    lg: "w-12 h-12 sm:w-14 sm:h-14"
  };
  const variantClasses = {
    default: "bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 hover:shadow-lg hover:shadow-black/20 dark:bg-slate-800/20 dark:border-slate-700/50 dark:text-slate-100 dark:hover:bg-slate-700/30",
    primary: "bg-blue-600/70 backdrop-blur-md border border-blue-500/40 text-white hover:bg-blue-500/80 hover:shadow-xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 dark:bg-blue-500/70 dark:border-blue-400/40 dark:hover:bg-blue-400/80 dark:hover:shadow-blue-400/50",
    secondary: "bg-slate-100/60 backdrop-blur-md border border-slate-200/50 text-slate-700 hover:bg-slate-200/70 hover:shadow-lg dark:bg-slate-700/30 dark:border-slate-600/50 dark:text-slate-200 dark:hover:bg-slate-600/40",
    outline: "border border-white/40 bg-white/15 backdrop-blur-md text-white hover:bg-white/25 hover:shadow-lg dark:border-slate-600/50 dark:bg-slate-800/15 dark:text-slate-200 dark:hover:bg-slate-700/25",
    ghost: "bg-transparent hover:bg-white/15 backdrop-blur-md text-white hover:shadow-lg dark:text-slate-200 dark:hover:bg-slate-700/25"
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: scrollToTop,
      className: cn(
        "fixed z-[9999] rounded-full transition-all duration-500 ease-in-out",
        "flex items-center justify-center",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
        "transform hover:scale-110 active:scale-95 shadow-lg",
        // 페이드 애니메이션
        isVisible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none",
        className,
        sizeClasses2[size],
        variantClasses[variant]
      ),
      "aria-label": "Scroll to top",
      ...props,
      children: /* @__PURE__ */ jsx(Icon, { name: icon, className: "w-5 h-5" })
    }
  );
};
var Scrollbar = React61.forwardRef(
  ({
    className,
    variant = "default",
    size = "md",
    orientation = "both",
    autoHide = true,
    smooth = true,
    children,
    ...props
  }, ref) => {
    const getVariantClasses = () => {
      switch (variant) {
        case "glass":
          return "scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30 backdrop-blur-sm";
        case "colorful":
          return "scrollbar-thumb-gradient-to-b scrollbar-thumb-from-blue-500 scrollbar-thumb-to-purple-500 hover:scrollbar-thumb-from-blue-600 hover:scrollbar-thumb-to-purple-600";
        case "minimal":
          return "scrollbar-thumb-slate-200/50 hover:scrollbar-thumb-slate-300/70 dark:scrollbar-thumb-slate-700/50 dark:hover:scrollbar-thumb-slate-600/70";
        case "neon":
          return "scrollbar-thumb-cyan-400/60 hover:scrollbar-thumb-cyan-300/80 scrollbar-thumb-shadow-lg scrollbar-thumb-shadow-cyan-500/25";
        default:
          return "scrollbar-thumb-slate-300 hover:scrollbar-thumb-slate-400 dark:scrollbar-thumb-slate-600 dark:hover:scrollbar-thumb-slate-500";
      }
    };
    const getSizeClasses = () => {
      switch (size) {
        case "sm":
          return "scrollbar-w-1";
        case "lg":
          return "scrollbar-w-3";
        case "xl":
          return "scrollbar-w-4";
        default:
          return "scrollbar-w-2";
      }
    };
    const getOrientationClasses = () => {
      switch (orientation) {
        case "vertical":
          return "overflow-y-auto overflow-x-hidden";
        case "horizontal":
          return "overflow-x-auto overflow-y-hidden";
        default:
          return "overflow-auto";
      }
    };
    const baseClasses = cn(
      "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-rounded-full transition-all duration-200",
      getVariantClasses(),
      getSizeClasses(),
      getOrientationClasses(),
      autoHide && "scrollbar-hide",
      smooth && "scroll-smooth",
      className
    );
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: baseClasses,
        ref,
        ...props,
        children
      }
    );
  }
);
Scrollbar.displayName = "Scrollbar";
var initialState = {
  theme: "system",
  setTheme: () => null,
  resolvedTheme: "light",
  toggleTheme: () => null
};
var ThemeProviderContext = createContext(initialState);
function ThemeProvider({
  children,
  defaultTheme = "light",
  // system에서 light로 변경
  storageKey = "hua-ui-theme",
  enableSystem = true,
  enableTransition = true,
  ...props
}) {
  const [theme, setTheme] = useState(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState("light");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem(storageKey);
      if (savedTheme) {
        setTheme(savedTheme);
      }
    }
  }, [storageKey]);
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system" && enableSystem) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
      setResolvedTheme(systemTheme);
    } else {
      root.classList.add(theme);
      setResolvedTheme(theme);
    }
    if (enableTransition) {
      root.classList.add("transition-colors", "duration-300");
    }
  }, [theme, enableSystem, enableTransition]);
  useEffect(() => {
    if (theme === "system" && enableSystem) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => {
        const systemTheme = mediaQuery.matches ? "dark" : "light";
        setResolvedTheme(systemTheme);
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(systemTheme);
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme, enableSystem]);
  const value = {
    theme,
    setTheme: (theme2) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, theme2);
      }
      setTheme(theme2);
    },
    resolvedTheme,
    toggleTheme: () => {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
    }
  };
  return /* @__PURE__ */ jsx(ThemeProviderContext.Provider, { ...props, value, children });
}
var useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === void 0)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
function ThemeToggle({
  className,
  size = "md",
  variant = "button",
  showLabel = false,
  label = {
    light: "\uB77C\uC774\uD2B8",
    dark: "\uB2E4\uD06C",
    system: "\uC2DC\uC2A4\uD15C"
  },
  ...props
}) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const sizeClasses2 = {
    sm: "h-10 w-10",
    // 40px - 더 넉넉한 크기
    md: "h-12 w-12",
    // 48px - 더 넉넉한 크기
    lg: "h-14 w-14"
    // 56px - 더 넉넉한 크기
  };
  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };
  const renderIcon = () => {
    if (theme === "system") {
      return /* @__PURE__ */ jsx(Icon, { name: "monitor", size: iconSizes[size] });
    }
    return resolvedTheme === "dark" ? /* @__PURE__ */ jsx(Icon, { name: "moon", size: iconSizes[size] }) : /* @__PURE__ */ jsx(Icon, { name: "sun", size: iconSizes[size], className: "text-amber-600" });
  };
  const handleClick = () => {
    if (theme === "system") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    }
  };
  if (variant === "icon") {
    return /* @__PURE__ */ jsx(
      "button",
      {
        onClick: handleClick,
        className: cn(
          "inline-flex items-center justify-center rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2",
          sizeClasses2[size],
          className
        ),
        ...props,
        children: /* @__PURE__ */ jsxs("div", { className: "relative flex items-center justify-center w-full h-full", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-300",
                resolvedTheme === "dark" ? "rotate-0 opacity-100" : "rotate-90 opacity-0"
              ),
              children: /* @__PURE__ */ jsx(Icon, { name: "moon", size: iconSizes[size], className: "text-blue-500" })
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-300",
                resolvedTheme === "dark" ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
              ),
              children: /* @__PURE__ */ jsx(Icon, { name: "sun", size: iconSizes[size], className: "text-amber-600 dark:text-yellow-500" })
            }
          )
        ] })
      }
    );
  }
  if (variant === "switch") {
    return /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: handleClick,
        className: cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2",
          resolvedTheme === "dark" ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: cn(
                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 shadow-lg",
                resolvedTheme === "dark" ? "translate-x-6" : "translate-x-1"
              )
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex items-center justify-between px-1.5", children: [
            /* @__PURE__ */ jsx(Icon, { name: "sun", size: 12, className: "text-amber-600 dark:text-yellow-500 opacity-0" }),
            /* @__PURE__ */ jsx(Icon, { name: "moon", size: 12, className: "text-blue-500 opacity-0" })
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: handleClick,
      className: cn(
        "inline-flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2",
        // 12px 간격, 16px, 12px 패딩
        className
      ),
      ...props,
      children: [
        renderIcon(),
        showLabel && /* @__PURE__ */ jsx("span", { children: theme === "system" ? label.system : theme === "dark" ? label.dark : label.light })
      ]
    }
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Action as Act, Action, ActivityFeed, AdvancedPageTransition, Alert, AlertError, AlertInfo, AlertSuccess, AlertWarning, Alert as Alt, Avatar, AvatarFallback, AvatarImage, Avatar as Avt, Badge, Bookmark2 as Bookmark, BottomSheet, Breadcrumb, BreadcrumbItem, Button as Btn, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, ChatMessage, Checkbox, Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, ComponentLayout, ConfirmModal, Container as Cont, Container, ContextMenu, ContextMenuGroup, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, Card as Crd, CubePageTransition, DashboardGrid, DashboardSidebar, Divider, Drawer, DrawerContent, DrawerFooter, DrawerHeader, Dropdown, DropdownGroup, DropdownItem, DropdownLabel, DropdownMenu, DropdownSeparator, EmotionAnalysis, EmotionButton, EmotionMeter, EmotionSelector, FadePageTransition, FeatureCard, FlipPageTransition, Form, FormField, FormGroup, Form as Frm, Grid, HeroSection, Icon as Ic, Icon, InfoCard, Input as Inp, Input, Label, LanguageToggle, Link, Link as Lnk, LoadingSpinner as Loading, LoadingSpinner, Modal as Mdl, MembershipBadge, Menu2 as Menu, MenuCompact, MenuHorizontal, MenuItem, MenuLabel, MenuSeparator, MenuVertical, MetricCard, MiniBarChart, Modal, MorphPageTransition, NavigationComponent as Navigation, NavigationContent, NavigationItem, NavigationList, NotificationCard, PageNavigation, PageTransition, Pagination, PaginationMinimal, PaginationOutlined, PaginationWithInfo, Panel, Popover, PopoverContent, PopoverTrigger, ProfileCard, Progress, ProgressCard, ProgressError, ProgressGroup, ProgressInfo, ProgressSuccess, ProgressWarning, QuickActionCard, Radio, ScalePageTransition, ScrollArea, ScrollIndicator, ScrollProgress, ScrollToTop, Scrollbar, SectionHeader, Select, SelectOption, Skeleton, SkeletonAvatar, SkeletonCard, SkeletonCircle, SkeletonImage, SkeletonList, SkeletonRectangle, SkeletonRounded, SkeletonTable, SkeletonText, SkeletonUserProfile, SlidePageTransition, Slider, Stack, StatCard, StatsPanel, SummaryCard, Switch, Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, Tabs, TabsCards, TabsContent, TabsList, TabsPills, TabsTrigger, TabsUnderline, Table as Tbl, Textarea, ThemeProvider, ThemeToggle, ToastProvider, Toggle, Tooltip, TooltipDark, TooltipLight, ZoomPageTransition, cn, emotionIcons, getIconFromProvider, getIconNameForProvider, iconCategories, initPhosphorIcons, merge, mergeIf, mergeMap, statusIcons, usePageTransition, usePageTransitionManager, useTheme, useToast };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map