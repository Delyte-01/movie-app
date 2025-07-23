import { Skeleton } from "@/components/ui/skeleton";

export default function HeroSkeleton() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black">
      {/* Background skeleton for image */}
      <Skeleton className="absolute inset-0 w-full h-full object-cover brightness-[0.85]" />

      {/* Overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      {/* Content Skeleton */}
      <div className="relative z-10 max-w-6xl px-4 sm:px-6 md:px-26 text-white space-y-6 animate-pulse">
        <Skeleton className="h-10 sm:h-14 md:h-20 w-3/4 rounded-md bg-white/20" />
        <div className="flex gap-3">
          <Skeleton className="h-5 w-12 bg-white/20 rounded-full" />
          <Skeleton className="h-5 w-16 bg-white/20 rounded-full" />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Skeleton className="h-6 w-20 rounded-full bg-white/10" />
          <Skeleton className="h-6 w-16 rounded-full bg-white/10" />
          <Skeleton className="h-6 w-24 rounded-full bg-white/10" />
        </div>
        <Skeleton className="h-20 sm:h-24 w-full max-w-xl rounded-md bg-white/10" />
        <div className="flex gap-3 flex-wrap">
          <Skeleton className="h-12 w-36 rounded-md bg-white/10" />
          <Skeleton className="h-12 w-44 rounded-md bg-white/10" />
          <Skeleton className="h-12 w-40 rounded-md bg-white/10" />
        </div>
      </div>
    </div>
  );
}
