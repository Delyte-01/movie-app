// pages/details/[media_type]/[id].tsx
import { useParams } from "next/navigation";

export default function DetailsPage() {
  const params = useParams();
  const { media_type, id } = params;

  // Fetch movie/tv details here
  return (
    <div>
      Show details for {media_type} #{id}
    </div>
  );
}
