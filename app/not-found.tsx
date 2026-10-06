import { Button } from "@/components/Button";
import { PulseMark } from "@/components/Illustration";

/* Custom 404 in the Folio empty-state style: calm canvas, the pulse
   mark, a plain heading, one primary action. */
export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-6 py-24 text-center">
      <PulseMark className="h-8 w-36" />
      <h1 className="font-display text-4xl font-medium text-ink">
        Lost?
      </h1>
      <p className="max-w-md text-md text-ink">
        The page you asked for does not exist or was moved. Head back to
        the home page to keep browsing.
      </p>
      <Button href="/" variant="primary">
        Back to home
      </Button>
    </div>
  );
}
