import { useLocation, useNavigate } from 'react-router-dom';

// Shared back navigation used across the app. It behaves like a normal mobile
// back button: it returns to the previous page in navigation history. When
// there is no in-app history to return to (a direct link, a refresh, or a
// shared URL opened cold), it falls back to the page's parent section so the
// user is never stranded or pushed out of the app.
//
// Placement and styling are intentionally identical everywhere this is used.
export function BackButton({
  fallback = '/',
  label = 'Back',
  className,
}: {
  fallback?: string;
  label?: string;
  className?: string;
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    // React Router assigns the very first history entry the key 'default'. If we
    // are still on it, there is nothing earlier in this app session to return
    // to, so use the safe section fallback instead of leaving the app.
    if (location.key === 'default') {
      navigate(fallback);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      type="button"
      onClick={goBack}
      className={
        className ??
        'inline-flex items-center gap-1 text-sm font-semibold text-leather-600'
      }
    >
      <span aria-hidden="true">&larr;</span> {label}
    </button>
  );
}
