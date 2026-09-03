export default function Loading() {
  return (
    <div className="navigation-progress navigation-progress--route is-active" role="status" aria-label="Loading page">
      <span className="navigation-progress__bar navigation-progress__bar--indeterminate" />
    </div>
  );
}
