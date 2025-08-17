import { toast } from "sonner";

type showFcmToastForReservationParams = {
  title?: string;
  body?: {
    message: string | null;
    eventDate: string | null;
    other: string | null;
  };
  onClick: () => void;
};
export const showFcmToastForReservation = ({ body, onClick }: showFcmToastForReservationParams) => {
  toast(body?.message, {
    description: () => {
      if (!body) return <></>;

      const { eventDate } = body;

      return <>{eventDate && <p>{eventDate}</p>}</>;
    },
    icon: <span className="text-body-1">🔔</span>,
    className:
      "bg-blue-100 text-blue-900 border border-blue-300 shadow cursor-pointer md:hover:bg-blue-200",
    action: {
      label: "확인",
      onClick: onClick,
    },
  });
};
