import * as React$1 from 'react';
import React__default, { DetailedHTMLProps, InputHTMLAttributes, HTMLAttributes, ImgHTMLAttributes } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { I as IconName, e as emotionIcons, s as statusIcons } from './advanced-dashboard-BPeMnQ0m.js';
export { A as ActivityFeed, i as ActivityFeedProps, j as ActivityItem, D as DashboardGrid, h as DashboardGridProps, M as MembershipBadge, m as MembershipBadgeProps, l as MembershipTier, c as MetricCard, r as MetricCardProps, a as MiniBarChart, n as MiniBarChartProps, N as NotificationCard, p as NotificationCardProps, q as NotificationItem, P as ProfileCard, k as ProfileCardProps, d as ProgressCard, t as ProgressCardProps, Q as QuickActionCard, g as QuickActionCardProps, S as StatCard, f as StatCardProps, b as SummaryCard, o as SummaryCardProps, u as iconCategories } from './advanced-dashboard-BPeMnQ0m.js';
import { LucideIcon } from 'lucide-react';
export { AdvancedPageTransition, AdvancedPageTransitionProps, CubePageTransition, FadePageTransition, FlipPageTransition, MorphPageTransition, ScalePageTransition, SlidePageTransition, TransitionEasing, TransitionType, ZoomPageTransition, usePageTransition, usePageTransitionManager } from './advanced.js';
import { ClassValue } from 'clsx';

/** 공통 옵션 */
type Variant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "gradient" | "neon" | "glass";
type Size = "sm" | "md" | "lg" | "xl" | "icon";
type Rounded = "sm" | "md" | "lg" | "full";
type Shadow = "none" | "sm" | "md" | "lg" | "xl";
type Hover = "scale" | "glow" | "slide" | "none";
type GradientName = "blue" | "purple" | "green" | "orange" | "pink" | "custom";
/** disabled를 공통에 명시해 앵커/버튼 모두에서 사용 */
type CommonProps = {
    variant?: Variant;
    size?: Size;
    loading?: boolean;
    icon?: React$1.ReactNode;
    iconPosition?: "left" | "right";
    gradient?: GradientName;
    customGradient?: string;
    rounded?: Rounded;
    shadow?: Shadow;
    hover?: Hover;
    fullWidth?: boolean;
    iconOnly?: boolean;
    "aria-label"?: string;
    className?: string;
    disabled?: boolean;
};
type AnchorProps = CommonProps & Omit<React$1.AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & {
    href: string;
};
type NativeButtonProps = CommonProps & Omit<React$1.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "type"> & {
    href?: undefined;
};
type ButtonProps = AnchorProps | NativeButtonProps;
type AnchorOrButton$1 = HTMLAnchorElement | HTMLButtonElement;
declare const Button: React$1.ForwardRefExoticComponent<ButtonProps & React$1.RefAttributes<AnchorOrButton$1>>;

/** Action 전용 옵션(버튼 공통 옵션은 ButtonProps에서 상속) */
type ActionKind = "primary" | "secondary" | "tertiary" | "magical" | "cyberpunk" | "ninja" | "wizard" | "sniper";
type FeedbackKind = "ripple" | "particle" | "sound" | "haptic" | "glitch" | "sparkle" | "smoke";
type ActionExtras = {
    actionType?: ActionKind;
    feedback?: FeedbackKind;
    particleEffect?: boolean;
    rippleEffect?: boolean;
    soundEffect?: boolean;
    hapticFeedback?: boolean;
    transparency?: number;
    blurIntensity?: number;
    glowIntensity?: number;
    glowColor?: string;
};
/** 👉 Action은 ButtonProps에 ActionExtras를 더한 *같은* 분기형 union을 그대로 사용 */
type ActionProps = ButtonProps & ActionExtras;
type AnchorEl = HTMLAnchorElement;
type ButtonEl = HTMLButtonElement;
type AnchorOrButton = AnchorEl | ButtonEl;
declare const Action: React$1.ForwardRefExoticComponent<ActionProps & React$1.RefAttributes<AnchorOrButton>>;

/**
 * Shared UI prop helpers.
 * Using type aliases instead of empty interfaces keeps
 * lint rules like `no-empty-object-type` satisfied and ensures
 * every component relies on the same base shapes.
 */
type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
type ImageProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
type ParagraphProps = DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
type HeadingProps = DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;

declare const Input: React$1.ForwardRefExoticComponent<Omit<InputProps, "ref"> & React$1.RefAttributes<HTMLInputElement>>;

interface LinkProps {
    href: string;
    children: React$1.ReactNode;
    variant?: "default" | "primary" | "secondary" | "ghost" | "underline";
    size?: "sm" | "md" | "lg";
    external?: boolean;
    className?: string;
    onClick?: () => void;
}
declare function Link({ href, children, className, variant, size, external, onClick }: LinkProps): react_jsx_runtime.JSX.Element;

/**
 * Icon Provider System
 *
 * Supports multiple icon libraries:
 * - Lucide Icons (default)
 * - Phosphor Icons
 * - Untitled Icons (SVG-based)
 *
 * Only imports icons that are actually used in the project for optimal bundle size.
 */

type IconProvider = 'lucide' | 'phosphor' | 'untitled';
interface IconProviderConfig {
    provider: IconProvider;
    prefix?: string;
}
/**
 * Initialize Phosphor Icons (lazy load)
 * Only loads when Phosphor provider is used
 * Uses tree-shaking to only include used icons
 */
declare function initPhosphorIcons(): Promise<any>;
/**
 * Get icon from provider
 * Only resolves icons that are in PROJECT_ICONS for optimal bundle size
 */
declare function getIconFromProvider(iconName: string, provider?: IconProvider): LucideIcon | React.ComponentType<any> | null;
/**
 * Get icon name for provider
 */
declare function getIconNameForProvider(iconName: string, provider: IconProvider): string;

interface IconProps {
    name: IconName | string;
    size?: number | string;
    className?: string;
    emotion?: keyof typeof emotionIcons;
    status?: keyof typeof statusIcons;
    animated?: boolean;
    pulse?: boolean;
    spin?: boolean;
    bounce?: boolean;
    variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'muted';
    provider?: IconProvider;
}
declare const Icon: React__default.ForwardRefExoticComponent<IconProps & React__default.RefAttributes<HTMLSpanElement>>;

type AvatarProps = DivProps & {
    size?: "sm" | "md" | "lg";
    variant?: "default" | "glass";
    src?: string;
    alt?: string;
};
declare const Avatar: React$1.ForwardRefExoticComponent<Omit<AvatarProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const AvatarImage: React$1.ForwardRefExoticComponent<Omit<ImageProps, "ref"> & React$1.RefAttributes<HTMLImageElement>>;
declare const AvatarFallback: React$1.ForwardRefExoticComponent<Omit<DivProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React$1.ReactNode;
    size?: "sm" | "md" | "lg" | "xl" | "2xl";
    showCloseButton?: boolean;
    closeOnOverlayClick?: boolean;
    title?: string;
    description?: string;
    showBackdrop?: boolean;
    centered?: boolean;
    className?: string;
}
declare function Modal({ className, isOpen, onClose, children, size, showCloseButton, closeOnOverlayClick, title, description, showBackdrop, centered }: ModalProps): react_jsx_runtime.JSX.Element | null;

interface FeatureCardProps extends React__default.HTMLAttributes<HTMLDivElement> {
    icon?: IconName | string;
    title: string;
    description: string;
    variant?: "default" | "gradient" | "glass" | "neon";
    size?: "sm" | "md" | "lg";
    hover?: "scale" | "glow" | "slide" | "none";
    gradient?: "blue" | "purple" | "green" | "orange" | "pink" | "custom";
    customGradient?: string;
}
declare const FeatureCard: React__default.ForwardRefExoticComponent<FeatureCardProps & React__default.RefAttributes<HTMLDivElement>>;

interface InfoCardProps extends React__default.HTMLAttributes<HTMLDivElement> {
    title: string;
    icon: IconName;
    tone?: "blue" | "purple" | "green" | "orange";
}
declare const InfoCard: React__default.ForwardRefExoticComponent<InfoCardProps & React__default.RefAttributes<HTMLDivElement>>;

interface HeroSectionProps extends React__default.HTMLAttributes<HTMLElement> {
    title: string;
    subtitle?: string;
    description: string;
    primaryAction?: {
        label: string;
        href: string;
        icon?: string;
    };
    secondaryAction?: {
        label: string;
        href: string;
        icon?: string;
    };
    variant?: "default" | "gradient" | "glass" | "neon";
    background?: "none" | "gradient" | "particles" | "video";
    customBackground?: string;
    size?: "sm" | "md" | "lg" | "xl";
}
declare const HeroSection: React__default.ForwardRefExoticComponent<HeroSectionProps & React__default.RefAttributes<HTMLElement>>;

interface ContainerProps extends React__default.HTMLAttributes<HTMLDivElement> {
    size?: "sm" | "md" | "lg" | "xl" | "full";
    padding?: "none" | "sm" | "md" | "lg" | "xl";
    centered?: boolean;
    fluid?: boolean;
}
declare const Container: React__default.ForwardRefExoticComponent<ContainerProps & React__default.RefAttributes<HTMLDivElement>>;

interface GridProps extends React$1.HTMLAttributes<HTMLDivElement> {
    cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    gap?: "none" | "sm" | "md" | "lg" | "xl";
    gapX?: "none" | "sm" | "md" | "lg" | "xl";
    gapY?: "none" | "sm" | "md" | "lg" | "xl";
    responsive?: boolean;
}
declare const Grid: React$1.ForwardRefExoticComponent<GridProps & React$1.RefAttributes<HTMLDivElement>>;

interface StackProps extends React$1.HTMLAttributes<HTMLDivElement> {
    direction?: "vertical" | "horizontal";
    spacing?: "none" | "sm" | "md" | "lg" | "xl";
    align?: "start" | "center" | "end" | "stretch";
    justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
    wrap?: boolean;
}
declare const Stack: React$1.ForwardRefExoticComponent<StackProps & React$1.RefAttributes<HTMLDivElement>>;

interface DividerProps extends React$1.HTMLAttributes<HTMLDivElement> {
    orientation?: "horizontal" | "vertical";
    variant?: "solid" | "dashed" | "dotted" | "gradient" | "glass";
    size?: "sm" | "md" | "lg";
    spacing?: "none" | "sm" | "md" | "lg" | "xl";
    color?: "default" | "muted" | "primary" | "secondary";
}
declare const Divider: React$1.ForwardRefExoticComponent<DividerProps & React$1.RefAttributes<HTMLDivElement>>;

type CardProps = DivProps & {
    variant?: "default" | "outline" | "elevated";
};
declare const Card: React__default.ForwardRefExoticComponent<Omit<CardProps, "ref"> & React__default.RefAttributes<HTMLDivElement>>;
declare const CardHeader: React__default.ForwardRefExoticComponent<Omit<DivProps, "ref"> & React__default.RefAttributes<HTMLDivElement>>;
declare const CardTitle: React__default.ForwardRefExoticComponent<Omit<HeadingProps, "ref"> & React__default.RefAttributes<HTMLHeadingElement>>;
declare const CardDescription: React__default.ForwardRefExoticComponent<Omit<ParagraphProps, "ref"> & React__default.RefAttributes<HTMLParagraphElement>>;
declare const CardContent: React__default.ForwardRefExoticComponent<Omit<DivProps, "ref"> & React__default.RefAttributes<HTMLDivElement>>;
declare const CardFooter: React__default.ForwardRefExoticComponent<Omit<DivProps, "ref"> & React__default.RefAttributes<HTMLDivElement>>;

interface PanelProps extends Omit<CardProps, 'variant' | 'style'> {
    style?: "default" | "glass" | "neon" | "holographic" | "cyberpunk" | "minimal" | "luxury";
    effect?: "none" | "glow" | "shadow" | "gradient" | "animated";
    transparency?: number;
    blurIntensity?: number;
    borderOpacity?: number;
    shadowOpacity?: number;
    glowIntensity?: number;
    glowColor?: string;
    particleEffect?: boolean;
    hoverEffect?: boolean;
    animationEffect?: boolean;
    padding?: "none" | "sm" | "md" | "lg" | "xl" | "custom";
    customPadding?: string;
    rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full" | "custom";
    customRounded?: string;
    background?: "solid" | "gradient" | "pattern" | "image" | "video";
    gradientColors?: string[];
    patternType?: "dots" | "lines" | "grid" | "waves" | "custom";
    backgroundImage?: string;
    backgroundVideo?: string;
    interactive?: boolean;
    hoverScale?: number;
    hoverRotate?: number;
    hoverGlow?: boolean;
}
declare const Panel: React__default.ForwardRefExoticComponent<Omit<PanelProps, "ref"> & React__default.RefAttributes<HTMLDivElement>>;

interface StatsPanelItem {
    label: string;
    value: string | React__default.ReactNode;
    description?: string | React__default.ReactNode;
    trend?: "up" | "down" | "neutral";
    trendValue?: string;
    accent?: "primary" | "secondary" | "neutral" | "warning";
    icon?: React__default.ReactNode;
}
interface StatsPanelProps extends React__default.HTMLAttributes<HTMLDivElement> {
    title?: string;
    items: StatsPanelItem[];
    columns?: 1 | 2 | 3 | 4;
    loading?: boolean;
}
declare const StatsPanel: React__default.ForwardRefExoticComponent<StatsPanelProps & React__default.RefAttributes<HTMLDivElement>>;

interface SectionHeaderProps extends React__default.HTMLAttributes<HTMLDivElement> {
    title: string;
    description?: string;
    action?: React__default.ReactNode;
}
declare const SectionHeader: React__default.ForwardRefExoticComponent<SectionHeaderProps & React__default.RefAttributes<HTMLDivElement>>;

interface NavigationProps extends Omit<React__default.HTMLAttributes<HTMLDivElement>, 'style'> {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    variant?: "pills" | "underline" | "cards";
    scale?: "small" | "medium" | "large";
}
interface NavigationListProps extends Omit<React__default.HTMLAttributes<HTMLDivElement>, 'style'> {
    value?: string;
    onValueChange?: (value: string) => void;
    variant?: "pills" | "underline" | "cards";
    scale?: "small" | "medium" | "large";
}
declare const NavigationList: React__default.ForwardRefExoticComponent<NavigationListProps & React__default.RefAttributes<HTMLDivElement>>;
interface NavigationItemProps extends Omit<React__default.ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
    value: string;
    onValueChange?: (value: string) => void;
    variant?: "pills" | "underline" | "cards";
    scale?: "small" | "medium" | "large";
    active?: boolean;
}
declare const NavigationItem: React__default.ForwardRefExoticComponent<NavigationItemProps & React__default.RefAttributes<HTMLButtonElement>>;
interface NavigationContentProps extends React__default.HTMLAttributes<HTMLDivElement> {
    value: string;
    active?: boolean;
}
declare const NavigationContent: React__default.ForwardRefExoticComponent<NavigationContentProps & React__default.RefAttributes<HTMLDivElement>>;
interface NavigationComponent extends React__default.ForwardRefExoticComponent<NavigationProps & React__default.RefAttributes<HTMLDivElement>> {
    List: typeof NavigationList;
    Item: typeof NavigationItem;
    Content: typeof NavigationContent;
}
declare const NavigationComponent: NavigationComponent;

interface BreadcrumbProps extends React__default.HTMLAttributes<HTMLDivElement> {
    children: React__default.ReactNode;
    separator?: React__default.ReactNode;
    variant?: 'default' | 'subtle' | 'transparent' | 'glass';
}
interface BreadcrumbItemProps {
    href?: string;
    isCurrent?: boolean;
    children: React__default.ReactNode;
    className?: string;
}
declare const Breadcrumb: React__default.ForwardRefExoticComponent<BreadcrumbProps & React__default.RefAttributes<HTMLDivElement>>;
declare const BreadcrumbItem: React__default.ForwardRefExoticComponent<BreadcrumbItemProps & React__default.RefAttributes<HTMLLIElement>>;

interface PaginationProps extends React$1.HTMLAttributes<HTMLDivElement> {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    showFirstLast?: boolean;
    showPrevNext?: boolean;
    maxVisiblePages?: number;
    size?: "sm" | "md" | "lg";
    variant?: "default" | "outlined" | "minimal";
    shape?: "square" | "circle";
}
declare const Pagination: React$1.ForwardRefExoticComponent<PaginationProps & React$1.RefAttributes<HTMLDivElement>>;
declare const PaginationOutlined: React$1.ForwardRefExoticComponent<Omit<PaginationProps, "variant"> & React$1.RefAttributes<HTMLDivElement>>;
declare const PaginationMinimal: React$1.ForwardRefExoticComponent<Omit<PaginationProps, "variant"> & React$1.RefAttributes<HTMLDivElement>>;
declare const PaginationWithInfo: React$1.ForwardRefExoticComponent<PaginationProps & {
    totalItems?: number;
    itemsPerPage?: number;
    showInfo?: boolean;
} & React$1.RefAttributes<HTMLDivElement>>;

interface PageNavigationProps extends React__default.HTMLAttributes<HTMLDivElement> {
    prevPage?: {
        title: string;
        href: string;
    };
    nextPage?: {
        title: string;
        href: string;
    };
    showOnMobile?: boolean;
}
declare const PageNavigation: React__default.ForwardRefExoticComponent<PageNavigationProps & React__default.RefAttributes<HTMLDivElement>>;

interface PageTransitionProps {
    children: React__default.ReactNode;
    className?: string;
    duration?: number;
    variant?: 'fade' | 'slide' | 'scale' | 'flip';
    loadingVariant?: 'default' | 'dots' | 'bars' | 'ring' | 'ripple';
    loadingText?: string;
    showLoading?: boolean;
    onTransitionStart?: () => void;
    onTransitionEnd?: () => void;
}
declare const PageTransition: React__default.ForwardRefExoticComponent<PageTransitionProps & React__default.RefAttributes<HTMLDivElement>>;

interface DashboardSidebarSection {
    id: string;
    label: string;
    items: Array<{
        id: string;
        label: string;
        href?: string;
        active?: boolean;
        icon?: React__default.ReactNode;
    }>;
}
interface DashboardSidebarProps extends React__default.HTMLAttributes<HTMLDivElement> {
    sections: DashboardSidebarSection[];
    isCollapsed?: boolean;
    onToggleCollapsed?: () => void;
    collapsedWidth?: number;
    expandedWidth?: number;
    mobileBreakpoint?: number;
    logo?: React__default.ReactNode;
    footer?: React__default.ReactNode;
}
declare const DashboardSidebar: React__default.ForwardRefExoticComponent<DashboardSidebarProps & React__default.RefAttributes<HTMLDivElement>>;

interface TableProps extends React$1.HTMLAttributes<HTMLTableElement> {
    children: React$1.ReactNode;
    variant?: "default" | "bordered" | "striped";
    size?: "sm" | "md" | "lg";
}
interface TableHeaderProps extends React$1.HTMLAttributes<HTMLTableSectionElement> {
    children: React$1.ReactNode;
}
interface TableBodyProps extends React$1.HTMLAttributes<HTMLTableSectionElement> {
    children: React$1.ReactNode;
}
interface TableFooterProps extends React$1.HTMLAttributes<HTMLTableSectionElement> {
    children: React$1.ReactNode;
}
interface TableRowProps extends React$1.HTMLAttributes<HTMLTableRowElement> {
    children: React$1.ReactNode;
    variant?: "default" | "hover";
}
interface TableHeadProps extends React$1.ThHTMLAttributes<HTMLTableCellElement> {
    children: React$1.ReactNode;
}
interface TableCellProps extends React$1.TdHTMLAttributes<HTMLTableCellElement> {
    children: React$1.ReactNode;
}
declare const Table: React$1.ForwardRefExoticComponent<TableProps & React$1.RefAttributes<HTMLTableElement>>;
declare const TableHeader: React$1.ForwardRefExoticComponent<TableHeaderProps & React$1.RefAttributes<HTMLTableSectionElement>>;
declare const TableBody: React$1.ForwardRefExoticComponent<TableBodyProps & React$1.RefAttributes<HTMLTableSectionElement>>;
declare const TableFooter: React$1.ForwardRefExoticComponent<TableFooterProps & React$1.RefAttributes<HTMLTableSectionElement>>;
declare const TableRow: React$1.ForwardRefExoticComponent<TableRowProps & React$1.RefAttributes<HTMLTableRowElement>>;
declare const TableHead: React$1.ForwardRefExoticComponent<TableHeadProps & React$1.RefAttributes<HTMLTableCellElement>>;
declare const TableCell: React$1.ForwardRefExoticComponent<TableCellProps & React$1.RefAttributes<HTMLTableCellElement>>;
declare const TableCaption: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableCaptionElement> & React$1.RefAttributes<HTMLTableCaptionElement>>;

interface BadgeProps extends React__default.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "secondary" | "destructive" | "outline" | "glass";
}
declare const Badge: React__default.ForwardRefExoticComponent<BadgeProps & React__default.RefAttributes<HTMLDivElement>>;

interface ProgressProps extends React$1.HTMLAttributes<HTMLDivElement> {
    value?: number;
    max?: number;
    size?: "sm" | "md" | "lg";
    variant?: "default" | "success" | "warning" | "error" | "info" | "glass";
    showValue?: boolean;
    animated?: boolean;
    striped?: boolean;
    label?: string;
    description?: string;
}
declare const Progress: React$1.ForwardRefExoticComponent<ProgressProps & React$1.RefAttributes<HTMLDivElement>>;
declare const ProgressSuccess: React$1.ForwardRefExoticComponent<Omit<ProgressProps, "variant"> & React$1.RefAttributes<HTMLDivElement>>;
declare const ProgressWarning: React$1.ForwardRefExoticComponent<Omit<ProgressProps, "variant"> & React$1.RefAttributes<HTMLDivElement>>;
declare const ProgressError: React$1.ForwardRefExoticComponent<Omit<ProgressProps, "variant"> & React$1.RefAttributes<HTMLDivElement>>;
declare const ProgressInfo: React$1.ForwardRefExoticComponent<Omit<ProgressProps, "variant"> & React$1.RefAttributes<HTMLDivElement>>;
declare const ProgressGroup: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;

interface SkeletonProps extends React$1.HTMLAttributes<HTMLDivElement> {
    variant?: "text" | "circular" | "rectangular" | "rounded";
    width?: string | number;
    height?: string | number;
    animation?: "pulse" | "wave" | "shimmer";
    className?: string;
}
declare const Skeleton: React$1.ForwardRefExoticComponent<SkeletonProps & React$1.RefAttributes<HTMLDivElement>>;
declare const SkeletonText: React$1.ForwardRefExoticComponent<Omit<SkeletonProps, "variant"> & React$1.RefAttributes<HTMLDivElement>>;
declare const SkeletonCircle: React$1.ForwardRefExoticComponent<Omit<SkeletonProps, "variant"> & React$1.RefAttributes<HTMLDivElement>>;
declare const SkeletonRectangle: React$1.ForwardRefExoticComponent<Omit<SkeletonProps, "variant"> & React$1.RefAttributes<HTMLDivElement>>;
declare const SkeletonRounded: React$1.ForwardRefExoticComponent<Omit<SkeletonProps, "variant"> & React$1.RefAttributes<HTMLDivElement>>;
declare const SkeletonCard: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
declare const SkeletonAvatar: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
declare const SkeletonImage: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
declare const SkeletonUserProfile: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
declare const SkeletonList: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
declare const SkeletonTable: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;

interface AlertProps extends React__default.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "success" | "warning" | "error" | "info";
    title?: string;
    description?: string;
    icon?: React__default.ReactNode;
    action?: React__default.ReactNode;
    closable?: boolean;
    onClose?: () => void;
}
declare const Alert: React__default.ForwardRefExoticComponent<AlertProps & React__default.RefAttributes<HTMLDivElement>>;
declare const AlertSuccess: React__default.ForwardRefExoticComponent<Omit<AlertProps, "variant"> & React__default.RefAttributes<HTMLDivElement>>;
declare const AlertWarning: React__default.ForwardRefExoticComponent<Omit<AlertProps, "variant"> & React__default.RefAttributes<HTMLDivElement>>;
declare const AlertError: React__default.ForwardRefExoticComponent<Omit<AlertProps, "variant"> & React__default.RefAttributes<HTMLDivElement>>;
declare const AlertInfo: React__default.ForwardRefExoticComponent<Omit<AlertProps, "variant"> & React__default.RefAttributes<HTMLDivElement>>;

interface Toast {
    id: string;
    type: "success" | "error" | "warning" | "info";
    title?: string;
    message: string;
    duration?: number;
    action?: {
        label: string;
        onClick: () => void;
    };
}
interface ToastContextType {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, "id">) => void;
    removeToast: (id: string) => void;
    clearToasts: () => void;
}
declare function useToast(): ToastContextType;
interface ToastProviderProps {
    children: React$1.ReactNode;
    maxToasts?: number;
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
}
declare function ToastProvider({ children, maxToasts, position }: ToastProviderProps): react_jsx_runtime.JSX.Element;

interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg" | "xl";
    variant?: "default" | "dots" | "bars" | "ring" | "ripple";
    text?: string;
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "error" | "glass";
    className?: string;
}
declare function LoadingSpinner({ className, size, variant, text, color }: LoadingSpinnerProps): react_jsx_runtime.JSX.Element;

interface TooltipProps extends React$1.HTMLAttributes<HTMLDivElement> {
    content: string;
    children: React$1.ReactNode;
    position?: "top" | "bottom" | "left" | "right";
    variant?: "default" | "light" | "dark";
    delay?: number;
    disabled?: boolean;
}
declare const Tooltip: React$1.ForwardRefExoticComponent<TooltipProps & React$1.RefAttributes<HTMLDivElement>>;
declare const TooltipLight: React$1.ForwardRefExoticComponent<Omit<TooltipProps, "variant"> & React$1.RefAttributes<HTMLDivElement>>;
declare const TooltipDark: React$1.ForwardRefExoticComponent<Omit<TooltipProps, "variant"> & React$1.RefAttributes<HTMLDivElement>>;

interface PopoverProps extends React$1.HTMLAttributes<HTMLDivElement> {
    children: React$1.ReactNode;
    trigger: React$1.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    position?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
    offset?: number;
    disabled?: boolean;
}
declare const Popover: React$1.ForwardRefExoticComponent<PopoverProps & React$1.RefAttributes<HTMLDivElement>>;
declare const PopoverTrigger: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
declare const PopoverContent: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;

type DropdownProps = DivProps & {
    trigger: React$1.ReactNode;
    children: React$1.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    placement?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
    offset?: number;
    disabled?: boolean;
    showArrow?: boolean;
};
declare const Dropdown: React$1.ForwardRefExoticComponent<Omit<DropdownProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
interface DropdownItemProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React$1.ReactNode;
    rightIcon?: React$1.ReactNode;
    variant?: "default" | "destructive" | "disabled";
}
declare const DropdownItem: React$1.ForwardRefExoticComponent<DropdownItemProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const DropdownSeparator: React$1.ForwardRefExoticComponent<Omit<DivProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownLabel: React$1.ForwardRefExoticComponent<Omit<DivProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenu: React$1.ForwardRefExoticComponent<Omit<DivProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownGroup: React$1.ForwardRefExoticComponent<Omit<DivProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

type DrawerSide = "left" | "right" | "top" | "bottom";
type DrawerSize = "sm" | "md" | "lg" | "xl" | "full";
type DrawerContentMaxWidth = "none" | "xs" | "sm" | "md" | "lg";
interface DrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React$1.ReactNode;
    className?: string;
    side?: DrawerSide;
    size?: DrawerSize;
    showBackdrop?: boolean;
    closeOnBackdropClick?: boolean;
    closeOnEscape?: boolean;
    backdropClassName?: string;
    viewportClassName?: string;
}
declare const Drawer: React$1.ForwardRefExoticComponent<DrawerProps & React$1.RefAttributes<HTMLDivElement>>;
interface DrawerHeaderProps {
    children: React$1.ReactNode;
    className?: string;
    showCloseButton?: boolean;
    onClose?: () => void;
}
declare const DrawerHeader: React$1.ForwardRefExoticComponent<DrawerHeaderProps & React$1.RefAttributes<HTMLDivElement>>;
interface DrawerContentProps {
    children: React$1.ReactNode;
    className?: string;
    maxWidth?: DrawerContentMaxWidth;
    align?: "start" | "center";
    padded?: boolean;
}
declare const DrawerContent: React$1.ForwardRefExoticComponent<DrawerContentProps & React$1.RefAttributes<HTMLDivElement>>;
interface DrawerFooterProps {
    children: React$1.ReactNode;
    className?: string;
}
declare const DrawerFooter: React$1.ForwardRefExoticComponent<DrawerFooterProps & React$1.RefAttributes<HTMLDivElement>>;

interface BottomSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React$1.ReactNode;
    className?: string;
    height?: "sm" | "md" | "lg" | "xl" | "full";
    showBackdrop?: boolean;
    closeOnBackdropClick?: boolean;
    closeOnEscape?: boolean;
    showDragHandle?: boolean;
    snapPoints?: number[];
    defaultSnap?: number;
}
declare const BottomSheet: React$1.ForwardRefExoticComponent<BottomSheetProps & React$1.RefAttributes<HTMLDivElement>>;

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    warning?: string;
    confirmText?: string;
    cancelText?: string;
    confirmButtonText?: string;
    type?: "danger" | "warning" | "info" | "success" | "error";
    loading?: boolean;
    disabled?: boolean;
    showInput?: boolean;
    inputValue?: string;
    onInputChange?: (value: string) => void;
    inputPlaceholder?: string;
    inputLabel?: string;
    requiredInputValue?: string;
    showCancel?: boolean;
    size?: "sm" | "md" | "lg" | "xl" | "2xl";
}
declare const ConfirmModal: React$1.ForwardRefExoticComponent<ConfirmModalProps & React$1.RefAttributes<HTMLDivElement>>;

interface FormProps extends React__default.FormHTMLAttributes<HTMLFormElement> {
    onSubmit?: (e: React__default.FormEvent<HTMLFormElement>) => void;
    variant?: "default" | "glass";
}
interface FormFieldProps extends React__default.HTMLAttributes<HTMLDivElement> {
    error?: string;
    required?: boolean;
}
interface FormGroupProps extends React__default.HTMLAttributes<HTMLDivElement> {
    inline?: boolean;
}
declare const Form: React__default.ForwardRefExoticComponent<FormProps & React__default.RefAttributes<HTMLFormElement>>;
declare const FormField: React__default.ForwardRefExoticComponent<FormFieldProps & React__default.RefAttributes<HTMLDivElement>>;
declare const FormGroup: React__default.ForwardRefExoticComponent<FormGroupProps & React__default.RefAttributes<HTMLDivElement>>;

interface LabelProps extends React__default.LabelHTMLAttributes<HTMLLabelElement> {
    required?: boolean;
    error?: boolean;
    disabled?: boolean;
    variant?: "default" | "glass";
}
declare const Label: React__default.ForwardRefExoticComponent<LabelProps & React__default.RefAttributes<HTMLLabelElement>>;

interface CheckboxProps extends Omit<React$1.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    variant?: "default" | "outline" | "filled" | "glass";
    size?: "sm" | "md" | "lg";
    error?: boolean;
    success?: boolean;
    label?: string;
    description?: string;
}
declare const Checkbox: React$1.ForwardRefExoticComponent<CheckboxProps & React$1.RefAttributes<HTMLInputElement>>;

interface RadioProps extends Omit<React$1.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    variant?: "default" | "outline" | "filled" | "glass";
    size?: "sm" | "md" | "lg";
    error?: boolean;
    success?: boolean;
    label?: string;
    description?: string;
}
declare const Radio: React$1.ForwardRefExoticComponent<RadioProps & React$1.RefAttributes<HTMLInputElement>>;

interface SelectProps extends Omit<React$1.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    variant?: "default" | "outline" | "filled" | "ghost" | "glass";
    size?: "sm" | "md" | "lg";
    error?: boolean;
    success?: boolean;
    leftIcon?: React$1.ReactNode;
    placeholder?: string;
}
interface SelectOptionProps extends React$1.OptionHTMLAttributes<HTMLOptionElement> {
    value: string;
    children: React$1.ReactNode;
}
declare const Select: React$1.ForwardRefExoticComponent<SelectProps & React$1.RefAttributes<HTMLSelectElement>>;
declare const SelectOption: React$1.ForwardRefExoticComponent<SelectOptionProps & React$1.RefAttributes<HTMLOptionElement>>;

interface SwitchProps extends Omit<React$1.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    variant?: "default" | "outline" | "filled" | "glass";
    size?: "sm" | "md" | "lg";
    error?: boolean;
    success?: boolean;
    label?: string;
    description?: string;
}
declare const Switch: React$1.ForwardRefExoticComponent<SwitchProps & React$1.RefAttributes<HTMLInputElement>>;

interface ToggleProps extends Omit<React$1.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
    variant?: "default" | "outline" | "filled" | "ghost" | "glass";
    size?: "sm" | "md" | "lg";
    pressed?: boolean;
    onPressedChange?: (pressed: boolean) => void;
    label?: string;
    description?: string;
    icon?: React$1.ReactNode;
    iconPosition?: "left" | "right";
}
declare const Toggle: React$1.ForwardRefExoticComponent<ToggleProps & React$1.RefAttributes<HTMLButtonElement>>;

interface SliderProps extends Omit<React$1.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange' | 'size'> {
    variant?: "default" | "primary" | "success" | "warning" | "danger";
    size?: "sm" | "md" | "lg";
    showValue?: boolean;
    showLabel?: boolean;
    label?: string;
    min?: number;
    max?: number;
    step?: number;
    value?: number | number[];
    onValueChange?: (value: number | number[]) => void;
    orientation?: "horizontal" | "vertical";
    disabled?: boolean;
    className?: string;
}
declare const Slider: React$1.ForwardRefExoticComponent<SliderProps & React$1.RefAttributes<HTMLInputElement>>;

interface TextareaProps extends React$1.TextareaHTMLAttributes<HTMLTextAreaElement> {
    variant?: "default" | "outline" | "filled" | "ghost" | "glass";
    size?: "sm" | "md" | "lg";
    error?: boolean;
    success?: boolean;
    resize?: "none" | "vertical" | "horizontal" | "both";
}
declare const Textarea: React$1.ForwardRefExoticComponent<TextareaProps & React$1.RefAttributes<HTMLTextAreaElement>>;

interface AccordionProps {
    children: React$1.ReactNode;
    className?: string;
    type?: "single" | "multiple";
    defaultValue?: string | string[];
    value?: string | string[];
    onValueChange?: (value: string | string[]) => void;
    collapsible?: boolean;
}
declare const Accordion: React$1.ForwardRefExoticComponent<AccordionProps & React$1.RefAttributes<HTMLDivElement>>;
interface AccordionItemProps {
    value: string;
    children: React$1.ReactNode;
    className?: string;
    disabled?: boolean;
    openItems?: string[];
    onToggle?: (value: string) => void;
}
declare const AccordionItem: React$1.ForwardRefExoticComponent<AccordionItemProps & React$1.RefAttributes<HTMLDivElement>>;
interface AccordionTriggerProps {
    children: React$1.ReactNode;
    className?: string;
    icon?: React$1.ReactNode;
    iconPosition?: "left" | "right";
    value?: string;
    isOpen?: boolean;
    disabled?: boolean;
    onToggle?: () => void;
}
declare const AccordionTrigger: React$1.ForwardRefExoticComponent<AccordionTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
interface AccordionContentProps {
    children: React$1.ReactNode;
    className?: string;
    isOpen?: boolean;
}
declare const AccordionContent: React$1.ForwardRefExoticComponent<AccordionContentProps & React$1.RefAttributes<HTMLDivElement>>;

interface TabsContentProps extends React__default.HTMLAttributes<HTMLDivElement> {
    value: string;
    active?: boolean;
}
declare const TabsContent: React__default.ForwardRefExoticComponent<TabsContentProps & React__default.RefAttributes<HTMLDivElement>>;
interface TabsProps extends React__default.HTMLAttributes<HTMLDivElement> {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    orientation?: "horizontal" | "vertical";
    variant?: "default" | "pills" | "underline" | "cards";
    size?: "sm" | "md" | "lg";
}
declare const Tabs: React__default.ForwardRefExoticComponent<TabsProps & React__default.RefAttributes<HTMLDivElement>>;
interface TabsListProps extends React__default.HTMLAttributes<HTMLDivElement> {
    value?: string;
    onValueChange?: (value: string) => void;
    orientation?: "horizontal" | "vertical";
    variant?: "default" | "pills" | "underline" | "cards";
    size?: "sm" | "md" | "lg";
}
declare const TabsList: React__default.ForwardRefExoticComponent<TabsListProps & React__default.RefAttributes<HTMLDivElement>>;
interface TabsTriggerProps extends React__default.ButtonHTMLAttributes<HTMLButtonElement> {
    value: string;
    onValueChange?: (value: string) => void;
    orientation?: "horizontal" | "vertical";
    variant?: "default" | "pills" | "underline" | "cards";
    size?: "sm" | "md" | "lg";
    active?: boolean;
}
declare const TabsTrigger: React__default.ForwardRefExoticComponent<TabsTriggerProps & React__default.RefAttributes<HTMLButtonElement>>;
declare const TabsPills: React__default.ForwardRefExoticComponent<TabsProps & React__default.RefAttributes<HTMLDivElement>>;
declare const TabsUnderline: React__default.ForwardRefExoticComponent<TabsProps & React__default.RefAttributes<HTMLDivElement>>;
declare const TabsCards: React__default.ForwardRefExoticComponent<TabsProps & React__default.RefAttributes<HTMLDivElement>>;

interface MenuProps extends React$1.HTMLAttributes<HTMLDivElement> {
    children: React$1.ReactNode;
    variant?: "default" | "horizontal" | "vertical" | "compact";
    size?: "sm" | "md" | "lg";
}
declare const Menu: React$1.ForwardRefExoticComponent<MenuProps & React$1.RefAttributes<HTMLDivElement>>;
interface MenuItemProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React$1.ReactNode;
    variant?: "default" | "horizontal" | "vertical" | "compact";
    size?: "sm" | "md" | "lg";
    active?: boolean;
    disabled?: boolean;
}
declare const MenuItem: React$1.ForwardRefExoticComponent<MenuItemProps & React$1.RefAttributes<HTMLButtonElement>>;
interface MenuSeparatorProps extends React$1.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "horizontal" | "vertical" | "compact";
}
declare const MenuSeparator: React$1.ForwardRefExoticComponent<MenuSeparatorProps & React$1.RefAttributes<HTMLDivElement>>;
interface MenuLabelProps extends React$1.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "horizontal" | "vertical" | "compact";
    size?: "sm" | "md" | "lg";
}
declare const MenuLabel: React$1.ForwardRefExoticComponent<MenuLabelProps & React$1.RefAttributes<HTMLDivElement>>;
declare const MenuHorizontal: React$1.ForwardRefExoticComponent<Omit<MenuProps, "variant"> & React$1.RefAttributes<HTMLDivElement>>;
declare const MenuVertical: React$1.ForwardRefExoticComponent<Omit<MenuProps, "variant"> & React$1.RefAttributes<HTMLDivElement>>;
declare const MenuCompact: React$1.ForwardRefExoticComponent<Omit<MenuProps, "variant"> & React$1.RefAttributes<HTMLDivElement>>;

type ContextMenuProps = DivProps & {
    children: React$1.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    trigger?: React$1.ReactNode;
    placement?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
    offset?: number;
    disabled?: boolean;
};
declare const ContextMenu: React$1.ForwardRefExoticComponent<Omit<ContextMenuProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
interface ContextMenuItemProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React$1.ReactNode;
    variant?: "default" | "destructive" | "disabled";
}
declare const ContextMenuItem: React$1.ForwardRefExoticComponent<ContextMenuItemProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const ContextMenuSeparator: React$1.ForwardRefExoticComponent<Omit<DivProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const ContextMenuLabel: React$1.ForwardRefExoticComponent<Omit<DivProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const ContextMenuGroup: React$1.ForwardRefExoticComponent<Omit<DivProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

type CommandProps = DivProps & {
    children: React$1.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    placeholder?: string;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    disabled?: boolean;
};
declare const Command: React$1.ForwardRefExoticComponent<Omit<CommandProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const CommandInput: React$1.ForwardRefExoticComponent<Omit<InputProps, "ref"> & React$1.RefAttributes<HTMLInputElement>>;
declare const CommandList: React$1.ForwardRefExoticComponent<Omit<DivProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
interface CommandItemProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React$1.ReactNode;
    selected?: boolean;
    onSelect?: () => void;
}
declare const CommandItem: React$1.ForwardRefExoticComponent<CommandItemProps & React$1.RefAttributes<HTMLButtonElement>>;
interface CommandGroupProps extends React$1.HTMLAttributes<HTMLDivElement> {
    heading?: React$1.ReactNode;
}
declare const CommandGroup: React$1.ForwardRefExoticComponent<CommandGroupProps & React$1.RefAttributes<HTMLDivElement>>;
declare const CommandSeparator: React$1.ForwardRefExoticComponent<Omit<DivProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const CommandEmpty: React$1.ForwardRefExoticComponent<Omit<DivProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const CommandDialog: React$1.ForwardRefExoticComponent<Omit<CommandProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

interface BookmarkProps extends React__default.HTMLAttributes<HTMLButtonElement> {
    id: string;
    storageKey?: string;
    defaultBookmarked?: boolean;
    onBookmarkChange?: (bookmarked: boolean) => void;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'filled' | 'outline';
}
declare const Bookmark: React__default.ForwardRefExoticComponent<BookmarkProps & React__default.RefAttributes<HTMLButtonElement>>;

interface ChatMessageProps extends React$1.HTMLAttributes<HTMLDivElement> {
    message: {
        id: string;
        content: string;
        role: "user" | "assistant" | "system";
        timestamp: Date;
        emotion?: string;
        intensity?: number;
        isTyping?: boolean;
    };
    user?: {
        name?: string;
        avatar?: string;
        color?: string;
    };
    assistant?: {
        name?: string;
        avatar?: string;
        color?: string;
    };
    showAvatar?: boolean;
    showTimestamp?: boolean;
    showEmotion?: boolean;
    variant?: "default" | "compact" | "bubble";
    theme?: {
        userBubbleBg?: string;
        userBubbleText?: string;
        aiBubbleBg?: string;
        aiBubbleText?: string;
    };
}
declare const ChatMessage: React$1.ForwardRefExoticComponent<ChatMessageProps & React$1.RefAttributes<HTMLDivElement>>;

interface ComponentLayoutProps extends React__default.HTMLAttributes<HTMLDivElement> {
    title: string;
    description: string;
    children: React__default.ReactNode;
    prevPage?: {
        title: string;
        href: string;
    };
    nextPage?: {
        title: string;
        href: string;
    };
    breadcrumbItems?: Array<{
        label: string;
        href?: string;
    }>;
}
declare const ComponentLayout: React__default.ForwardRefExoticComponent<ComponentLayoutProps & React__default.RefAttributes<HTMLDivElement>>;

interface EmotionAnalysisProps extends React$1.HTMLAttributes<HTMLDivElement> {
    primaryEmotion?: {
        name: string;
        intensity: number;
        color?: string;
    };
    emotionDistribution?: Array<{
        emotion: string;
        percentage: number;
        color: string;
    }>;
    keywords?: string[];
    intensity?: number;
    positivity?: number;
    energy?: number;
    showMeter?: boolean;
    showDistribution?: boolean;
    showKeywords?: boolean;
    showMetrics?: boolean;
    layout?: "compact" | "detailed" | "card";
}
declare const EmotionAnalysis: React$1.ForwardRefExoticComponent<EmotionAnalysisProps & React$1.RefAttributes<HTMLDivElement>>;

interface EmotionButtonProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement> {
    emotion: string;
    isSelected?: boolean;
    size?: "sm" | "md" | "lg";
}
declare const EmotionButton: React$1.ForwardRefExoticComponent<EmotionButtonProps & React$1.RefAttributes<HTMLButtonElement>>;

interface EmotionMeterProps extends React$1.HTMLAttributes<HTMLDivElement> {
    value: number;
    max?: number;
    size?: "sm" | "md" | "lg";
    color?: "blue" | "green" | "yellow" | "red";
}
declare const EmotionMeter: React$1.ForwardRefExoticComponent<EmotionMeterProps & React$1.RefAttributes<HTMLDivElement>>;

interface EmotionSelectorProps extends React$1.HTMLAttributes<HTMLDivElement> {
    selectedEmotion?: string;
    onEmotionSelect?: (emotion: string) => void;
    layout?: "grid" | "list" | "compact";
    showIntensity?: boolean;
    intensity?: number;
    onIntensityChange?: (intensity: number) => void;
    emotions?: Array<{
        key: string;
        label: string;
        icon?: string;
        color?: string;
    }>;
    size?: "sm" | "md" | "lg";
    variant?: "button" | "card" | "chip";
}
declare const EmotionSelector: React$1.ForwardRefExoticComponent<EmotionSelectorProps & React$1.RefAttributes<HTMLDivElement>>;

interface LanguageToggleProps {
    className?: string;
    size?: "sm" | "md" | "lg";
    variant?: "button" | "icon" | "dropdown";
    showLabel?: boolean;
    languages?: Array<{
        code: string;
        name: string;
        flag?: string;
    }>;
    currentLanguage?: string;
    onLanguageChange?: (language: string) => void;
}
declare const LanguageToggle: React$1.ForwardRefExoticComponent<LanguageToggleProps & React$1.RefAttributes<HTMLDivElement>>;

interface ScrollAreaProps extends React$1.HTMLAttributes<HTMLDivElement> {
    children: React$1.ReactNode;
    className?: string;
    orientation?: "vertical" | "horizontal" | "both";
    scrollHideDelay?: number;
    type?: "auto" | "always" | "scroll" | "hover";
}
declare const ScrollArea: React$1.ForwardRefExoticComponent<ScrollAreaProps & React$1.RefAttributes<HTMLDivElement>>;

interface ScrollIndicatorProps {
    className?: string;
    targetId?: string;
    text?: string;
    iconName?: string;
    iconSize?: number;
    position?: 'bottom-center' | 'bottom-left' | 'bottom-right';
    variant?: 'default' | 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    animated?: boolean;
    autoHide?: boolean;
    hideThreshold?: number;
}
declare const ScrollIndicator: React__default.ForwardRefExoticComponent<ScrollIndicatorProps & React__default.RefAttributes<HTMLDivElement>>;

interface ScrollProgressProps {
    className?: string;
    height?: number;
    color?: 'default' | 'primary' | 'secondary' | 'gradient';
    position?: 'top' | 'bottom';
    animated?: boolean;
    showPercentage?: boolean;
}
declare const ScrollProgress: React__default.ForwardRefExoticComponent<ScrollProgressProps & React__default.RefAttributes<HTMLDivElement>>;

interface ScrollToTopProps extends React__default.HTMLAttributes<HTMLButtonElement> {
    threshold?: number;
    smooth?: boolean;
    className?: string;
    icon?: IconName;
    size?: "sm" | "md" | "lg";
    variant?: "default" | "primary" | "secondary" | "outline" | "ghost";
    showOnMount?: boolean;
}
declare const ScrollToTop: ({ className, threshold, smooth, icon, size, variant, showOnMount, ...props }: ScrollToTopProps) => react_jsx_runtime.JSX.Element;

interface ScrollbarProps extends React$1.HTMLAttributes<HTMLDivElement> {
    children: React$1.ReactNode;
    variant?: "default" | "glass" | "colorful" | "minimal" | "neon";
    size?: "sm" | "md" | "lg" | "xl";
    orientation?: "vertical" | "horizontal" | "both";
    autoHide?: boolean;
    smooth?: boolean;
}
declare const Scrollbar: React$1.ForwardRefExoticComponent<ScrollbarProps & React$1.RefAttributes<HTMLDivElement>>;

type Theme = "light" | "dark" | "system";
interface ThemeProviderProps {
    children: React$1.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
    enableSystem?: boolean;
    enableTransition?: boolean;
}
interface ThemeProviderState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    resolvedTheme: "light" | "dark";
    toggleTheme: () => void;
}
declare function ThemeProvider({ children, defaultTheme, // system에서 light로 변경
storageKey, enableSystem, enableTransition, ...props }: ThemeProviderProps): React$1.ReactElement;
declare const useTheme: () => ThemeProviderState;

interface ThemeToggleProps {
    className?: string;
    size?: "sm" | "md" | "lg";
    variant?: "button" | "icon" | "switch";
    showLabel?: boolean;
    label?: {
        light?: string;
        dark?: string;
        system?: string;
    };
}
declare function ThemeToggle({ className, size, variant, showLabel, label, ...props }: ThemeToggleProps): react_jsx_runtime.JSX.Element;

/**
 * HUA UI의 스마트 클래스 병합 유틸리티
 * clsx와 tailwind-merge를 결합하여 중복 클래스를 자동으로 해결합니다.
 *
 * @param inputs - 병합할 클래스 값들
 * @returns 병합된 클래스 문자열
 *
 * @example
 * ```tsx
 * merge("px-2 py-1", "px-4") // "py-1 px-4"
 * merge("text-red-500", "text-blue-500") // "text-blue-500"
 * merge("bg-white", "dark:bg-slate-900") // "bg-white dark:bg-slate-900"
 * ```
 */
declare function merge(...inputs: ClassValue[]): string;
/**
 * 조건부 클래스 병합 유틸리티
 * 조건에 따라 클래스를 선택적으로 병합합니다.
 *
 * @param condition - 클래스를 적용할 조건
 * @param trueClass - 조건이 true일 때 적용할 클래스
 * @param falseClass - 조건이 false일 때 적용할 클래스 (선택사항)
 * @returns 병합된 클래스 문자열
 *
 * @example
 * ```tsx
 * mergeIf(isActive, "bg-blue-500", "bg-gray-200")
 * mergeIf(isLoading, "opacity-50 cursor-not-allowed")
 * ```
 */
declare function mergeIf(condition: boolean, trueClass: ClassValue, falseClass?: ClassValue): string;
/**
 * 객체 기반 클래스 병합 유틸리티
 * 객체의 키-값 쌍을 기반으로 조건부 클래스를 병합합니다.
 *
 * @param classMap - 클래스 맵 객체
 * @returns 병합된 클래스 문자열
 *
 * @example
 * ```tsx
 * mergeMap({
 *   "bg-blue-500": isPrimary,
 *   "bg-gray-500": !isPrimary,
 *   "text-white": true,
 *   "opacity-50": isDisabled
 * })
 * ```
 */
declare function mergeMap(classMap: Record<string, boolean | undefined | null>): string;
declare const cn: typeof merge;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Action as Act, Action, Alert, AlertError, AlertInfo, AlertSuccess, AlertWarning, Alert as Alt, Avatar, AvatarFallback, AvatarImage, Avatar as Avt, Badge, Bookmark, BottomSheet, Breadcrumb, BreadcrumbItem, Button as Btn, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, ChatMessage, Checkbox, Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, ComponentLayout, ConfirmModal, Container as Cont, Container, ContextMenu, ContextMenuGroup, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, Card as Crd, DashboardSidebar, type DashboardSidebarProps, type DashboardSidebarSection, Divider, Drawer, DrawerContent, DrawerFooter, DrawerHeader, Dropdown, DropdownGroup, DropdownItem, DropdownLabel, DropdownMenu, DropdownSeparator, EmotionAnalysis, EmotionButton, EmotionMeter, EmotionSelector, FeatureCard, Form, FormField, FormGroup, Form as Frm, Grid, HeroSection, Icon as Ic, Icon, IconName, type IconProvider, type IconProviderConfig, InfoCard, Input as Inp, Input, Label, LanguageToggle, Link, Link as Lnk, LoadingSpinner as Loading, LoadingSpinner, Modal as Mdl, Menu, MenuCompact, MenuHorizontal, MenuItem, MenuLabel, MenuSeparator, MenuVertical, Modal, NavigationComponent as Navigation, NavigationContent, NavigationItem, NavigationList, PageNavigation, PageTransition, Pagination, PaginationMinimal, PaginationOutlined, PaginationWithInfo, Panel, Popover, PopoverContent, PopoverTrigger, Progress, ProgressError, ProgressGroup, ProgressInfo, ProgressSuccess, ProgressWarning, Radio, ScrollArea, ScrollIndicator, ScrollProgress, ScrollToTop, Scrollbar, SectionHeader, type SectionHeaderProps, Select, SelectOption, Skeleton, SkeletonAvatar, SkeletonCard, SkeletonCircle, SkeletonImage, SkeletonList, SkeletonRectangle, SkeletonRounded, SkeletonTable, SkeletonText, SkeletonUserProfile, Slider, Stack, StatsPanel, type StatsPanelItem, type StatsPanelProps, Switch, Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, Tabs, TabsCards, TabsContent, TabsList, TabsPills, TabsTrigger, TabsUnderline, Table as Tbl, Textarea, ThemeProvider, ThemeToggle, type Toast, ToastProvider, Toggle, Tooltip, TooltipDark, TooltipLight, cn, emotionIcons, getIconFromProvider, getIconNameForProvider, initPhosphorIcons, merge, mergeIf, mergeMap, statusIcons, useTheme, useToast };
