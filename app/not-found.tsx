import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { StarDoodle } from "@/components/Illustration";

/* Custom 404 in the Sketch empty-state style: cream canvas, simple
   pencil illustration, clear heading, one teal primary action. */
export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-6 py-16 text-center">
      <StarDoodle className="h-16 w-16" />
      <Card variant="empty" className="flex max-w-xl flex-col items-center gap-4">
        <h1 className="text-xl font-semibold text-ink">
          This page is not in the sketchbook.
        </h1>
        <p className="text-md text-ink">
          The page you asked for does not exist or was moved. Head back to
          the home page to keep browsing.
        </p>
        <Button href="/" variant="primary">
          Back to home
        </Button>
      </Card>
    </div>
  );
}
