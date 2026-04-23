export default function Breadcrumbs({ breadcrumbs, setBreadcrumbsRoute }) {
    return (
        <div className="w-full flex items-center gap-1 text-xs font-semibold tracking-wider py-2">
            {breadcrumbs.map((breadcrumb, index) => (
                breadcrumb.isLink ? (
                    <button
                        key={index}
                        onClick={() => setBreadcrumbsRoute(breadcrumb.label)}
                        className={breadcrumbs[index].active ? "text-primary transition-colors cursor-pointer" : "text-secondary/90 hover:text-primary transition-colors cursor-pointer"}
                    >
                        {breadcrumb.label.toUpperCase()}
                        {index < breadcrumbs.length - 1 && " |"}
                    </button>
                ) : (
                    <span
                        key={index}
                        className="text-secondary/90 transition-colors"
                    >
                        {breadcrumb.label.toUpperCase()}
                        {index < breadcrumbs.length - 1 && " |"}
                    </span>
                )
            ))}
        </div>
    );
}
