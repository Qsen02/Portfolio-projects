export function onImageError(event: React.SyntheticEvent<HTMLImageElement, Event>) {
    const img=event.target as HTMLImageElement;
    img.src = "assets/film-logo-initial-letter-v-movie-logo-design-template-element-eps10-vector.jpg";
}