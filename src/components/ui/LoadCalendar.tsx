interface IProps {
  loadEventsRef: React.RefObject<HTMLDivElement>;
}

function LoadCalendar({ loadEventsRef }: IProps): React.ReactNode {
  return (
    <div className="load-events" ref={loadEventsRef}>
      Cargando...
    </div>
  );
}

export default LoadCalendar;
