import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

interface ComicCardProps {
  image?: string; // URL or import
  title: string;
  subtitle: string;
  price: string;
  date: string;
  badge?: string;
  bgColor?: string;
  children?: React.ReactNode;
}

export const ComicCard: React.FC<ComicCardProps> = ({
  image,
  title,
  subtitle,
  price,
  date,
  badge,
  bgColor = "bg-yellow-100",
  children,
}) => (
  <div
    className={`relative rounded-xl shadow-2xl border-4 border-black w-72 ${bgColor} overflow-hidden flex flex-col font-comic`}
    style={{ fontFamily: "'Bangers', cursive" }}
  >
    <div className="flex-1 flex items-center justify-center p-4 bg-white">
      {image && (
        <img
          src={image}
          alt={title}
          className="h-40 object-contain drop-shadow-lg"
          style={{ filter: "drop-shadow(2px 4px 6px #222)" }}
        />
      )}
    </div>
    <div className="px-4 py-2 border-t-4 border-black bg-white">
      <div className="text-2xl font-bold text-green-700 uppercase tracking-wider">{title}</div>
      <div className="uppercase text-xs tracking-widest text-gray-700 mb-1">{subtitle}</div>
      {badge && (
        <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded font-bold border-2 border-black text-xs uppercase">
          {badge}
        </div>
      )}
      <div className="flex justify-between items-center mt-2">
        <span className="text-xl font-bold">{price}</span>
        <span className="text-xs text-gray-600">{date}</span>
      </div>
      {children}
    </div>
  </div>
);

interface PetCardProps {
  image: string;
  name: string;
  description: string;
  type: string;
  size: string;
  weight: string;
  onAdopt?: () => void;
  className?: string;
}

export const PetCard: React.FC<PetCardProps> = ({
  image,
  name,
  description,
  type,
  size,
  weight,
  onAdopt,
  className = '',
}) => (
  <div className={`max-w-xs rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-200 flex flex-col ${className}`}>
    <img src={image} alt={name} className="w-full h-24 object-cover" />
    <div className="p-5">
      <h2 className="text-xl font-bold text-gray-900 mb-1 font-sans">{name}</h2>
      <p className="text-gray-700 text-sm mb-4 font-sans">{description}</p>
      <div className="flex justify-between text-xs text-gray-500 mb-4 font-sans">
        <div>
          <div className="font-semibold text-gray-800">TYPE</div>
          <div>{type}</div>
        </div>
        <div>
          <div className="font-semibold text-gray-800">SIZE</div>
          <div>{size}</div>
        </div>
        <div>
          <div className="font-semibold text-gray-800">WEIGHT</div>
          <div>{weight}</div>
        </div>
      </div>
      <button
        onClick={onAdopt}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors font-sans"
      >
        Adopt {name.split(' ')[0]}!
      </button>
    </div>
  </div>
);

export interface AchievementCardProps {
  image: string;
  name: string;
  date: string;
  type: string;
  position?: string;
  category?: string;
  project?: string;
  teamSize?: string;
  team?: string;
  authors?: string;
  publication?: string;
  doi?: string;
  abstract?: string;
  fileName?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  image,
  name,
  date,
  type,
  position,
  category,
  project,
  teamSize,
  team,
  authors,
  publication,
  doi,
  abstract,
  fileName,
  onEdit,
  onDelete,
  className = '',
}) => (
  <div className={`max-w-xs rounded-2xl overflow-hidden shadow-lg border border-gray-300 flex flex-col bg-blue-50 m-2 p-4 ${className}`}>
    <img src={image} alt={name} className="w-full h-24 object-cover rounded-md mb-3" />
    <div className="flex flex-col gap-1 text-gray-900">
      <h2 className="text-xl font-bold mb-1 font-sans">{name}</h2>
      <div className="text-xs text-gray-700 mb-1 font-sans">{type} | {date}</div>
      {project && <div><span className="font-semibold">Project:</span> {project}</div>}
      {category && <div><span className="font-semibold">Category:</span> {category}</div>}
      {position && <div><span className="font-semibold">Position:</span> {position}</div>}
      {teamSize && <div><span className="font-semibold">Team Size:</span> {teamSize}</div>}
      {team && <div><span className="font-semibold">Team:</span> {team}</div>}
      {authors && <div><span className="font-semibold">Authors:</span> {authors}</div>}
      {publication && <div><span className="font-semibold">Publication:</span> {publication}</div>}
      {doi && <div><span className="font-semibold">DOI:</span> {doi}</div>}
      {abstract && <div><span className="font-semibold">Abstract:</span> {abstract}</div>}
      {fileName && <div><span className="font-semibold">File:</span> {fileName}</div>}
      <div className="flex gap-2 mt-3">
        {onEdit && <button onClick={onEdit} className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-2 rounded">Edit</button>}
        {onDelete && <button onClick={onDelete} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">Delete</button>}
      </div>
    </div>
  </div>
);

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
