'use strict';

var React = require('react');
var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');
var LucideIcons = require('lucide-react');
var jsxRuntime = require('react/jsx-runtime');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React__default = /*#__PURE__*/_interopDefault(React);
var LucideIcons__namespace = /*#__PURE__*/_interopNamespace(LucideIcons);

// src/components/dashboard/StatCard.tsx
function merge(...inputs) {
  return tailwindMerge.twMerge(clsx.clsx(inputs));
}
var cn = merge;
var icons = {
  // Navigation & UI
  home: LucideIcons.Home,
  menu: LucideIcons.Menu,
  close: LucideIcons.X,
  search: LucideIcons.Search,
  settings: LucideIcons.Settings,
  user: LucideIcons.User,
  bell: LucideIcons.Bell,
  heart: LucideIcons.Heart,
  star: LucideIcons.Star,
  bookmark: LucideIcons.Bookmark,
  share: LucideIcons.Share,
  download: LucideIcons.Download,
  upload: LucideIcons.Upload,
  edit: LucideIcons.Edit,
  delete: LucideIcons.Trash2,
  add: LucideIcons.Plus,
  remove: LucideIcons.Minus,
  check: LucideIcons.Check,
  alertCircle: LucideIcons.AlertCircle,
  info: LucideIcons.Info,
  warning: LucideIcons.AlertCircle,
  chevronDown: LucideIcons.ChevronDown,
  chevronUp: LucideIcons.ChevronUp,
  chevronLeft: LucideIcons.ChevronLeft,
  chevronRight: LucideIcons.ChevronRight,
  "layout-dashboard": LucideIcons.LayoutDashboard,
  columns: LucideIcons.Columns,
  inbox: LucideIcons.Inbox,
  checkSquare: LucideIcons.CheckSquare,
  arrowLeft: LucideIcons.ArrowLeft,
  arrowRight: LucideIcons.ArrowRight,
  arrowUp: LucideIcons.ArrowUp,
  arrowDown: LucideIcons.ArrowDown,
  arrowRightLeft: LucideIcons.ArrowRightLeft,
  move: LucideIcons.Move,
  "move-horizontal": LucideIcons.MoveHorizontal,
  moreHorizontal: LucideIcons.MoreHorizontal,
  moreVertical: LucideIcons.MoreVertical,
  "maximize-2": LucideIcons.Maximize2,
  "flask-conical": LucideIcons.FlaskConical,
  hand: LucideIcons.Hand,
  waves: LucideIcons.Waves,
  // Communication
  message: LucideIcons.MessageCircle,
  phone: LucideIcons.Phone,
  mail: LucideIcons.Mail,
  send: LucideIcons.Send,
  reply: LucideIcons.Reply,
  forward: LucideIcons.Forward,
  copy: LucideIcons.Copy,
  link: LucideIcons.Link,
  externalLink: LucideIcons.ExternalLink,
  // Media
  play: LucideIcons.Play,
  pause: LucideIcons.Pause,
  skipBack: LucideIcons.SkipBack,
  skipForward: LucideIcons.SkipForward,
  volume: LucideIcons.Volume2,
  mute: LucideIcons.VolumeX,
  music: LucideIcons.Music,
  video: LucideIcons.Video,
  image: LucideIcons.Image,
  camera: LucideIcons.Camera,
  mic: LucideIcons.Mic,
  headphones: LucideIcons.Headphones,
  // Emotions
  smile: LucideIcons.Smile,
  frown: LucideIcons.Frown,
  meh: LucideIcons.Meh,
  laugh: LucideIcons.Laugh,
  angry: LucideIcons.Angry,
  thumbsUp: LucideIcons.ThumbsUp,
  thumbsDown: LucideIcons.ThumbsDown,
  // Data & Analytics
  chart: LucideIcons.BarChart3,
  pieChart: LucideIcons.PieChart,
  trendingUp: LucideIcons.TrendingUp,
  trendingDown: LucideIcons.TrendingDown,
  activity: LucideIcons.Activity,
  database: LucideIcons.Database,
  fileText: LucideIcons.FileText,
  folder: LucideIcons.Folder,
  calendar: LucideIcons.Calendar,
  clock: LucideIcons.Clock,
  timer: LucideIcons.Timer,
  // Status & Feedback
  loader: LucideIcons.Loader2,
  refresh: LucideIcons.RefreshCw,
  success: LucideIcons.CheckCircle,
  error: LucideIcons.XCircle,
  helpCircle: LucideIcons.HelpCircle,
  eye: LucideIcons.Eye,
  eyeOff: LucideIcons.EyeOff,
  lock: LucideIcons.Lock,
  unlock: LucideIcons.Unlock,
  shield: LucideIcons.Shield,
  zap: LucideIcons.Zap,
  sun: LucideIcons.Sun,
  moon: LucideIcons.Moon,
  cloud: LucideIcons.Cloud,
  rain: LucideIcons.CloudRain,
  // Finance
  creditCard: LucideIcons.CreditCard,
  dollarSign: LucideIcons.DollarSign,
  euro: LucideIcons.Euro,
  poundSterling: LucideIcons.PoundSterling,
  bitcoin: LucideIcons.Bitcoin,
  shoppingCart: LucideIcons.ShoppingCart,
  shoppingBag: LucideIcons.ShoppingBag,
  package: LucideIcons.Package,
  truck: LucideIcons.Truck,
  store: LucideIcons.Store,
  tag: LucideIcons.Tag,
  percent: LucideIcons.Percent,
  calculator: LucideIcons.Calculator,
  receipt: LucideIcons.Receipt,
  wallet: LucideIcons.Wallet,
  piggyBank: LucideIcons.PiggyBank,
  barChart: LucideIcons.BarChart,
  lineChart: LucideIcons.LineChart,
  // Mobile & App
  smartphone: LucideIcons.Smartphone,
  tablet: LucideIcons.Tablet,
  monitor: LucideIcons.Monitor,
  laptop: LucideIcons.Laptop,
  wifi: LucideIcons.Wifi,
  wifiOff: LucideIcons.WifiOff,
  bluetooth: LucideIcons.Bluetooth,
  signal: LucideIcons.Signal,
  battery: LucideIcons.Battery,
  batteryCharging: LucideIcons.BatteryCharging,
  volume1: LucideIcons.Volume,
  volume2: LucideIcons.Volume1,
  vibrate: LucideIcons.Vibrate,
  rotateCcw: LucideIcons.RotateCcw,
  rotateCw: LucideIcons.RotateCw,
  maximize: LucideIcons.Maximize,
  minimize: LucideIcons.Minimize,
  // Business
  briefcase: LucideIcons.Briefcase,
  building: LucideIcons.Building,
  building2: LucideIcons.Building2,
  users: LucideIcons.Users,
  userPlus: LucideIcons.UserPlus,
  userMinus: LucideIcons.UserMinus,
  userCheck: LucideIcons.UserCheck,
  userX: LucideIcons.UserX,
  userCog: LucideIcons.UserCog,
  // Files
  file: LucideIcons.File,
  fileImage: LucideIcons.FileImage,
  fileVideo: LucideIcons.FileVideo,
  fileAudio: LucideIcons.FileAudio,
  fileArchive: LucideIcons.FileArchive,
  fileCode: LucideIcons.FileCode,
  fileSpreadsheet: LucideIcons.FileSpreadsheet,
  fileCheck: LucideIcons.FileCheck,
  fileX: LucideIcons.FileX,
  filePlus: LucideIcons.FilePlus,
  fileMinus: LucideIcons.FileMinus,
  fileEdit: LucideIcons.FileEdit,
  fileSearch: LucideIcons.FileSearch,
  // Security & Authentication
  shieldCheck: LucideIcons.ShieldCheck,
  shieldAlert: LucideIcons.ShieldAlert,
  key: LucideIcons.Key,
  fingerprint: LucideIcons.Fingerprint,
  logIn: LucideIcons.LogIn,
  logOut: LucideIcons.LogOut,
  // Communication Extended
  messageSquare: LucideIcons.MessageSquare,
  phoneCall: LucideIcons.PhoneCall,
  phoneIncoming: LucideIcons.PhoneIncoming,
  phoneOutgoing: LucideIcons.PhoneOutgoing,
  phoneMissed: LucideIcons.PhoneMissed,
  phoneOff: LucideIcons.PhoneOff,
  mailOpen: LucideIcons.MailOpen,
  mailCheck: LucideIcons.MailCheck,
  mailX: LucideIcons.MailX,
  mailPlus: LucideIcons.MailPlus,
  mailMinus: LucideIcons.MailMinus,
  mailSearch: LucideIcons.MailSearch,
  // Social Media
  facebook: LucideIcons.Facebook,
  twitter: LucideIcons.Twitter,
  instagram: LucideIcons.Instagram,
  linkedin: LucideIcons.Linkedin,
  youtube: LucideIcons.Youtube,
  twitch: LucideIcons.Twitch,
  github: LucideIcons.Github,
  slack: LucideIcons.Slack,
  figma: LucideIcons.Figma,
  chrome: LucideIcons.Chrome,
  codepen: LucideIcons.Codepen,
  codesandbox: LucideIcons.Codesandbox,
  // Navigation Extended
  navigation: LucideIcons.Navigation,
  navigation2: LucideIcons.Navigation2,
  compass: LucideIcons.Compass,
  globe: LucideIcons.Globe,
  globe2: LucideIcons.Globe2,
  flag: LucideIcons.Flag,
  flagTriangleRight: LucideIcons.FlagTriangleRight,
  // Actions Extended
  save: LucideIcons.Save,
  saveAll: LucideIcons.SaveAll,
  undo: LucideIcons.Undo,
  redo: LucideIcons.Redo,
  scissors: LucideIcons.Scissors,
  type: LucideIcons.Type,
  bold: LucideIcons.Bold,
  italic: LucideIcons.Italic,
  underline: LucideIcons.Underline,
  strikethrough: LucideIcons.Strikethrough,
  alignLeft: LucideIcons.AlignLeft,
  alignCenter: LucideIcons.AlignCenter,
  alignRight: LucideIcons.AlignRight,
  alignJustify: LucideIcons.AlignJustify,
  list: LucideIcons.List,
  listOrdered: LucideIcons.ListOrdered,
  listChecks: LucideIcons.ListChecks,
  // Feedback Extended
  heartOff: LucideIcons.HeartOff,
  starOff: LucideIcons.StarOff,
  bookmarkPlus: LucideIcons.BookmarkPlus,
  bookmarkMinus: LucideIcons.BookmarkMinus,
  // Status Extended
  circle: LucideIcons.Circle,
  circleDot: LucideIcons.CircleDot,
  circleSlash: LucideIcons.CircleSlash,
  // Weather Extended
  cloudSnow: LucideIcons.CloudSnow,
  cloudLightning: LucideIcons.CloudLightning,
  cloudFog: LucideIcons.CloudFog,
  wind: LucideIcons.Wind,
  thermometer: LucideIcons.Thermometer,
  droplets: LucideIcons.Droplets,
  umbrella: LucideIcons.Umbrella,
  // Time & Date
  calendarDays: LucideIcons.CalendarDays,
  calendarCheck: LucideIcons.CalendarCheck,
  calendarX: LucideIcons.CalendarX,
  calendarPlus: LucideIcons.CalendarPlus,
  calendarMinus: LucideIcons.CalendarMinus,
  calendarClock: LucideIcons.CalendarClock,
  // 추가된 누락 아이콘들
  palette: LucideIcons.Palette,
  bookOpen: LucideIcons.BookOpen,
  layers: LucideIcons.Layers,
  mousePointer: LucideIcons.MousePointer,
  toggleLeft: LucideIcons.ToggleLeft,
  square: LucideIcons.Square,
  sidebar: LucideIcons.Sidebar,
  gauge: LucideIcons.Gauge,
  sparkles: LucideIcons.Sparkles,
  // 문서 페이지용 아이콘들
  book: LucideIcons.Book,
  code: LucideIcons.Code,
  brain: LucideIcons.Brain,
  rocket: LucideIcons.Rocket,
  target: LucideIcons.Target,
  lightbulb: LucideIcons.Lightbulb,
  graduationCap: LucideIcons.GraduationCap,
  award: LucideIcons.Award,
  trophy: LucideIcons.Trophy,
  medal: LucideIcons.Medal,
  crown: LucideIcons.Crown,
  gem: LucideIcons.Gem,
  diamond: LucideIcons.Diamond,
  // Science & Lab
  beaker: LucideIcons.Beaker,
  testTube: LucideIcons.TestTube,
  microscope: LucideIcons.Microscope,
  atom: LucideIcons.Atom
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
      return LucideIcons__namespace[mappedName] || null;
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
      return LucideIcons__namespace[iconName] || LucideIcons__namespace[lucideName] || null;
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
var Icon = React__default.default.forwardRef(({
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
  const [isClient, setIsClient] = React__default.default.useState(false);
  const [phosphorLoaded, setPhosphorLoaded] = React__default.default.useState(false);
  React__default.default.useEffect(() => {
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
    return /* @__PURE__ */ jsxRuntime.jsx("span", { style: { width: size, height: size }, className });
  }
  if (!isClient || provider === "phosphor" && !phosphorLoaded) {
    return /* @__PURE__ */ jsxRuntime.jsx("span", { style: { width: size, height: size }, className });
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      ref,
      className: cn(
        "inline-flex items-center justify-center",
        animationClasses,
        className
      ),
      style: { width: size, height: size },
      children: IconComponent && React__default.default.createElement(IconComponent, iconProps)
    }
  );
});
Icon.displayName = "Icon";
var EmotionIcon = React__default.default.forwardRef(
  (props, ref) => /* @__PURE__ */ jsxRuntime.jsx(Icon, { ref, name: "smile", ...props })
);
EmotionIcon.displayName = "EmotionIcon";
var StatusIcon = React__default.default.forwardRef(
  (props, ref) => /* @__PURE__ */ jsxRuntime.jsx(Icon, { ref, name: "info", ...props })
);
StatusIcon.displayName = "StatusIcon";
var LoadingIcon = React__default.default.forwardRef(
  (props, ref) => /* @__PURE__ */ jsxRuntime.jsx(Icon, { ref, name: "loader", status: "loading", spin: true, ...props })
);
LoadingIcon.displayName = "LoadingIcon";
var SuccessIcon = React__default.default.forwardRef(
  (props, ref) => /* @__PURE__ */ jsxRuntime.jsx(Icon, { ref, name: "check", status: "success", variant: "success", ...props })
);
SuccessIcon.displayName = "SuccessIcon";
var ErrorIcon = React__default.default.forwardRef(
  (props, ref) => /* @__PURE__ */ jsxRuntime.jsx(Icon, { ref, name: "alertCircle", status: "error", variant: "error", ...props })
);
ErrorIcon.displayName = "ErrorIcon";
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
var StatCard = React__default.default.forwardRef(
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
    return /* @__PURE__ */ jsxRuntime.jsxs(
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
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
            icon && /* @__PURE__ */ jsxRuntime.jsx("div", { className: merge(
              "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0",
              iconClasses
            ), children: typeof icon === "string" ? /* @__PURE__ */ jsxRuntime.jsx(
              Icon,
              {
                name: icon,
                className: merge(
                  "w-6 h-6",
                  isTextWhite ? "text-white" : ""
                )
              }
            ) : icon }),
            title && /* @__PURE__ */ jsxRuntime.jsx("span", { className: merge(
              "text-sm px-3 py-1 rounded-full font-medium",
              badgeClasses
            ), children: title })
          ] }),
          loading ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" }) : /* @__PURE__ */ jsxRuntime.jsx("h3", { className: merge(
            "text-3xl font-bold mb-1",
            isTextWhite ? "text-white" : "text-gray-800 dark:text-white"
          ), children: formatValue(value) }),
          description && /* @__PURE__ */ jsxRuntime.jsx("p", { className: merge(
            "text-sm",
            isTextWhite ? "text-white/90" : "text-gray-600 dark:text-gray-300"
          ), children: description }),
          trend && !loading && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "mt-3 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntime.jsxs(
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
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: merge(
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
var QuickActionCard = React__default.default.forwardRef(
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
    const content = /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      icon && /* @__PURE__ */ jsxRuntime.jsx("div", { className: merge(
        "w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2",
        iconBgClasses
      ), children: typeof icon === "string" ? /* @__PURE__ */ jsxRuntime.jsx(
        Icon,
        {
          name: icon,
          className: merge(
            "w-6 h-6",
            isTextWhite ? "text-white" : ""
          )
        }
      ) : icon }),
      /* @__PURE__ */ jsxRuntime.jsx("h3", { className: merge(
        "text-xl font-semibold mb-1",
        isTextWhite ? "text-white" : ""
      ), children: title }),
      description && /* @__PURE__ */ jsxRuntime.jsx("p", { className: merge(
        "text-sm",
        isTextWhite ? "text-white/90" : "text-gray-600 dark:text-gray-300"
      ), children: description }),
      loading && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mt-2 h-4 bg-white/20 rounded animate-pulse" })
    ] });
    if (href) {
      return /* @__PURE__ */ jsxRuntime.jsx(
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
    return /* @__PURE__ */ jsxRuntime.jsx(
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
var DashboardGrid = React__default.default.forwardRef(
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
    return /* @__PURE__ */ jsxRuntime.jsx(
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
var ActivityFeed = React__default.default.forwardRef(
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
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        className: merge(
          "bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700",
          className
        ),
        ...props,
        children: [
          showHeader && title && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700", children: [
            /* @__PURE__ */ jsxRuntime.jsx("h2", { className: "text-xl font-bold text-gray-800 dark:text-white flex items-center", children: title }),
            onViewAll && /* @__PURE__ */ jsxRuntime.jsxs(
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
          displayItems.length > 0 ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "divide-y divide-gray-200 dark:divide-gray-700", children: [
            displayItems.map((item) => /* @__PURE__ */ jsxRuntime.jsxs(
              "div",
              {
                onClick: item.onClick,
                className: merge(
                  "p-4 transition-colors",
                  item.onClick && "hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer group"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-start justify-between mb-2", children: [
                    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-start gap-3", children: [
                      item.icon && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 mt-0.5", children: typeof item.icon === "string" ? /* @__PURE__ */ jsxRuntime.jsx(
                        Icon,
                        {
                          name: item.icon,
                          className: "w-4 h-4 text-purple-600 dark:text-purple-400"
                        }
                      ) : item.icon }),
                      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "text-base font-semibold text-gray-800 dark:text-white mb-1 truncate", children: item.title }),
                        item.description && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-gray-600 dark:text-gray-300 line-clamp-2", children: item.description })
                      ] })
                    ] }) }),
                    item.badge && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "ml-2 flex-shrink-0", children: typeof item.badge === "string" ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300", children: item.badge }) : item.badge })
                  ] }),
                  item.metadata && Object.keys(item.metadata).length > 0 && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center gap-1 flex-wrap mt-2", children: Object.entries(item.metadata).map(([key, value]) => /* @__PURE__ */ jsxRuntime.jsxs(
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
                  /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-2", children: formatTimestamp(item.timestamp) })
                ]
              },
              item.id
            )),
            hasMore && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "p-4 text-center border-t border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsxRuntime.jsxs(
              "button",
              {
                onClick: onViewAll,
                className: "inline-flex items-center text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx("span", { children: "\uB354 \uB9CE\uC740 \uD65C\uB3D9 \uBCF4\uAE30" }),
                  /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "ml-1", children: [
                    "(",
                    items.length - (maxItems || 0),
                    "\uAC1C \uB354)"
                  ] }),
                  /* @__PURE__ */ jsxRuntime.jsx("span", { className: "ml-1", children: "\u2192" })
                ]
              }
            ) })
          ] }) : /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-center py-8", children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-4xl mb-3 block", children: "\u{1F4ED}" }),
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-gray-500 dark:text-gray-400 text-sm", children: emptyMessage })
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
var ProfileCard = React__default.default.forwardRef(
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
    return /* @__PURE__ */ jsxRuntime.jsxs(
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
          variant === "gradient" && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-10 dark:opacity-20" }),
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute inset-0 bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 opacity-5 dark:opacity-15" })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative flex items-start gap-6", children: [
            showSettings && (onSettingsClick || settingsHref) && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute top-0 right-0", children: settingsHref ? /* @__PURE__ */ jsxRuntime.jsx(
              "a",
              {
                href: settingsHref,
                className: "p-2 text-gray-400 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",
                title: "\uC124\uC815",
                children: /* @__PURE__ */ jsxRuntime.jsx(Icon, { name: "settings", className: "w-6 h-6" })
              }
            ) : /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                onClick: onSettingsClick,
                className: "p-2 text-gray-400 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",
                title: "\uC124\uC815",
                children: /* @__PURE__ */ jsxRuntime.jsx(Icon, { name: "settings", className: "w-6 h-6" })
              }
            ) }),
            showAvatar && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "relative flex-shrink-0", children: avatar ? /* @__PURE__ */ jsxRuntime.jsx(
              "img",
              {
                src: avatar,
                alt: avatarAlt || name,
                className: "w-20 h-20 rounded-full border-4 border-white dark:border-gray-700 shadow-lg object-cover"
              }
            ) : /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-4 border-white dark:border-gray-700 shadow-lg", children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-2xl font-bold text-white", children: name.charAt(0).toUpperCase() }) }) }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1 min-w-0", children: [
              greeting && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-lg sm:text-xl font-semibold mb-2", children: greeting.split(" ").map((part, index) => {
                const isEmoji = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(part);
                return /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
                  isEmoji ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-gray-900 dark:text-white", children: part }) : /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent", children: part }),
                  index < greeting.split(" ").length - 1 && " "
                ] }, index);
              }) }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap items-center gap-2 sm:gap-3 mb-2", children: [
                /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate", children: [
                  name,
                  "!"
                ] }),
                showMembership && membershipTier && /* @__PURE__ */ jsxRuntime.jsxs(
                  "span",
                  {
                    className: merge(
                      "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-lg",
                      tierStyle.badge
                    ),
                    children: [
                      /* @__PURE__ */ jsxRuntime.jsx("svg", { className: "w-3 h-3 mr-1", fill: "currentColor", viewBox: "0 0 20 20", children: tier === "premium" ? /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) : tier === "admin" ? /* @__PURE__ */ jsxRuntime.jsx("path", { fillRule: "evenodd", d: "M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z", clipRule: "evenodd" }) : /* @__PURE__ */ jsxRuntime.jsx("path", { fillRule: "evenodd", d: "M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }),
                      tierLabel
                    ]
                  }
                )
              ] }),
              email && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-gray-600 dark:text-gray-400 text-sm mb-1 truncate", children: email }),
              memberSince && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-gray-400 text-xs flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntime.jsx(Icon, { name: "clock", className: "w-3 h-3" }),
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
var MembershipBadge = React__default.default.forwardRef(
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
        return /* @__PURE__ */ jsxRuntime.jsx("svg", { className: sizeStyle.icon, fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) });
      }
      if (tier === "admin") {
        return /* @__PURE__ */ jsxRuntime.jsx("svg", { className: sizeStyle.icon, fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsxRuntime.jsx("path", { fillRule: "evenodd", d: "M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z", clipRule: "evenodd" }) });
      }
      return /* @__PURE__ */ jsxRuntime.jsx("svg", { className: sizeStyle.icon, fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsxRuntime.jsx("path", { fillRule: "evenodd", d: "M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) });
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(
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
          showIcon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "mr-1", children: getIcon() }),
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
var MiniBarChart = React__default.default.forwardRef(
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
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        className: merge("w-full", className),
        ...props,
        children: [
          /* @__PURE__ */ jsxRuntime.jsxs(
            "div",
            {
              className: "flex items-end justify-between gap-2 px-2 relative",
              style: { height: `${height + 40}px` },
              children: [
                /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute inset-x-2 bottom-8 border-t border-gray-200 dark:border-gray-700 opacity-50" }),
                data.map((value, index) => {
                  const isToday = highlightToday && index === todayIdx;
                  const barHeight = calculateHeight(value);
                  const barColor = isToday ? colors.highlight : colors.default;
                  return /* @__PURE__ */ jsxRuntime.jsxs(
                    "div",
                    {
                      className: "flex flex-col items-center flex-1 group relative",
                      children: [
                        showTooltip && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10", children: [
                          value,
                          "\uAC1C",
                          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700" })
                        ] }),
                        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200", children: value }),
                        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "relative w-full flex-1 flex items-end", children: /* @__PURE__ */ jsxRuntime.jsx(
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
                            children: value > 0 && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white dark:bg-gray-800 rounded-full shadow-sm" })
                          }
                        ) }),
                        labels && labels[index] && /* @__PURE__ */ jsxRuntime.jsx(
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
          showStats && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "mt-4 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 px-2", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
              "\uCD1D: ",
              total
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
              "\uD3C9\uADE0: ",
              average
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
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
var SummaryCard = React__default.default.forwardRef(
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
    const content = /* @__PURE__ */ jsxRuntime.jsxs(
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
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: `absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${colors.decoration} rounded-full -translate-y-16 translate-x-16` }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: `absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr ${colors.decoration} rounded-full translate-y-12 -translate-x-12` }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between mb-4 relative z-10", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center", children: [
              icon && /* @__PURE__ */ jsxRuntime.jsx("div", { className: merge(
                "p-2 rounded-lg",
                isGradient ? "bg-white/20" : colors.icon
              ), children: typeof icon === "string" ? /* @__PURE__ */ jsxRuntime.jsx(
                Icon,
                {
                  name: icon,
                  className: merge(
                    "w-6 h-6",
                    isTextWhite ? "text-white" : ""
                  )
                }
              ) : icon }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: merge(
                "text-lg font-semibold ml-3",
                isTextWhite ? "text-white" : "text-gray-900 dark:text-white"
              ), children: title })
            ] }),
            badge && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-xs font-medium", children: typeof badge === "string" ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: merge(
              "px-2 py-1 rounded-full",
              isGradient ? "bg-white/20 text-white" : "bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300"
            ), children: badge }) : badge })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex-1 flex flex-col justify-center relative z-10", children: loading ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: merge(
              "text-3xl font-bold mb-2",
              isTextWhite ? "text-white" : "text-gray-900 dark:text-white"
            ), children: formatValue(value) }),
            subtitle && /* @__PURE__ */ jsxRuntime.jsx("div", { className: merge(
              "text-sm mb-4",
              isTextWhite ? "text-white/90" : "text-gray-600 dark:text-gray-400"
            ), children: subtitle })
          ] }) }),
          footer && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "relative z-10 mb-4", children: footer }),
          showAction && (href || onClick) && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "relative z-10", children: href ? /* @__PURE__ */ jsxRuntime.jsx(
            "a",
            {
              href,
              className: merge(
                "block w-full text-center py-3 rounded-lg font-semibold text-white hover:shadow-lg transition-all duration-200 group-hover:scale-[1.02]",
                colors.button
              ),
              children: actionLabel
            }
          ) : /* @__PURE__ */ jsxRuntime.jsx(
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
var NotificationCard = React__default.default.forwardRef(
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
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        className: merge(
          "bg-white dark:bg-gray-800 rounded-xl shadow p-6",
          className
        ),
        ...props,
        children: [
          showHeader && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsxRuntime.jsx("div", { className: "p-2 bg-orange-500/10 rounded-lg mr-3", children: /* @__PURE__ */ jsxRuntime.jsx(Icon, { name: "bell", className: "w-6 h-6 text-orange-600 dark:text-orange-400" }) }),
              /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: title })
            ] }),
            showCount && items.length > 0 && /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300", children: [
              items.length,
              "\uAC1C"
            ] })
          ] }),
          displayItems.length > 0 ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "space-y-3", children: displayItems.map((item) => {
            const typeStyle = getTypeStyles(item.type);
            const content = /* @__PURE__ */ jsxRuntime.jsx(
              "div",
              {
                className: merge(
                  "p-3 rounded-lg border",
                  typeStyle.container,
                  typeStyle.border,
                  (item.onClick || item.href) && "cursor-pointer hover:shadow-md transition-all duration-200"
                ),
                children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-start", children: [
                  /* @__PURE__ */ jsxRuntime.jsx("div", { className: merge(
                    "w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0",
                    typeStyle.dot
                  ) }),
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm font-semibold text-gray-900 dark:text-white", children: item.title }),
                      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-xs text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0", children: formatTimestamp(item.timestamp) })
                    ] }),
                    /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-gray-600 dark:text-gray-400", children: item.message })
                  ] })
                ] })
              }
            );
            if (item.href) {
              return /* @__PURE__ */ jsxRuntime.jsx("a", { href: item.href, children: content }, item.id);
            }
            if (item.onClick) {
              return /* @__PURE__ */ jsxRuntime.jsx("div", { onClick: item.onClick, children: content }, item.id);
            }
            return /* @__PURE__ */ jsxRuntime.jsx("div", { children: content }, item.id);
          }) }) : /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-center py-8", children: [
            /* @__PURE__ */ jsxRuntime.jsx(Icon, { name: "bell", className: "w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" }),
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-gray-500 dark:text-gray-400 text-sm", children: emptyMessage })
          ] }),
          hasMore && onViewAll && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mt-4 text-center", children: /* @__PURE__ */ jsxRuntime.jsxs(
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
var MetricCard = React__default.default.forwardRef(
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
    return /* @__PURE__ */ jsxRuntime.jsxs(
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
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
            icon && /* @__PURE__ */ jsxRuntime.jsx("div", { className: merge(
              "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0",
              iconClasses
            ), children: typeof icon === "string" ? /* @__PURE__ */ jsxRuntime.jsx(
              Icon,
              {
                name: icon,
                className: merge(
                  "w-6 h-6",
                  isTextWhite ? "text-white" : ""
                )
              }
            ) : icon }),
            title && /* @__PURE__ */ jsxRuntime.jsx("span", { className: merge(
              "text-sm px-3 py-1 rounded-full font-medium",
              badgeClasses
            ), children: title })
          ] }),
          loading ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" }) : /* @__PURE__ */ jsxRuntime.jsx("h3", { className: merge(
            "text-3xl font-bold mb-1",
            isTextWhite ? "text-white" : "text-gray-800 dark:text-white"
          ), children: formatValue(value) }),
          description && /* @__PURE__ */ jsxRuntime.jsx("p", { className: merge(
            "text-sm mb-3",
            isTextWhite ? "text-white/90" : "text-gray-600 dark:text-gray-300"
          ), children: description }),
          showChart && chartData && chartData.length > 0 && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mt-4 mb-3", children: /* @__PURE__ */ jsxRuntime.jsx(
            MiniBarChart,
            {
              data: chartData,
              labels: chartLabels,
              color,
              height: 100,
              showStats: false
            }
          ) }),
          trend && !loading && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "mt-3 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntime.jsxs(
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
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: merge(
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
var ProgressCard = React__default.default.forwardRef(
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
    return /* @__PURE__ */ jsxRuntime.jsxs(
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
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
            icon && /* @__PURE__ */ jsxRuntime.jsx(
              "div",
              {
                className: merge(
                  "rounded-lg flex items-center justify-center flex-shrink-0",
                  sizes.icon,
                  isGradient ? "bg-white/20" : colors.icon
                ),
                children: typeof icon === "string" ? /* @__PURE__ */ jsxRuntime.jsx(
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
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1 ml-4", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
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
              description && /* @__PURE__ */ jsxRuntime.jsx(
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
          loading ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" }),
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "h-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" })
          ] }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-baseline justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntime.jsxs(
                "span",
                {
                  className: merge(
                    "font-bold",
                    sizes.value,
                    isGradient ? "text-white" : colors.text
                  ),
                  children: [
                    current.toLocaleString(),
                    unit && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm ml-1", children: unit })
                  ]
                }
              ),
              showLabel && /* @__PURE__ */ jsxRuntime.jsxs(
                "span",
                {
                  className: merge(
                    "text-sm",
                    isGradient ? "text-white/80" : "text-gray-600 dark:text-gray-400"
                  ),
                  children: [
                    "/ ",
                    total.toLocaleString(),
                    unit && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "ml-1", children: unit })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntime.jsx(
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
            showPercentage && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mt-2 flex justify-end", children: /* @__PURE__ */ jsxRuntime.jsxs(
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

exports.ActivityFeed = ActivityFeed;
exports.DashboardGrid = DashboardGrid;
exports.MembershipBadge = MembershipBadge;
exports.MetricCard = MetricCard;
exports.MiniBarChart = MiniBarChart;
exports.NotificationCard = NotificationCard;
exports.ProfileCard = ProfileCard;
exports.ProgressCard = ProgressCard;
exports.QuickActionCard = QuickActionCard;
exports.StatCard = StatCard;
exports.SummaryCard = SummaryCard;
//# sourceMappingURL=advanced-dashboard.js.map
//# sourceMappingURL=advanced-dashboard.js.map