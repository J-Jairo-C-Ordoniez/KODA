import Header from "@/components/store/Header/Header"
import StoreLanding from "@/components/store/Main/StoreLanding"
import Footer from "@/components/store/Footer/Footer"

interface Props {
    tenantId?: string;
    businessName?: string;
    slug?: string;
}

export function LandingStore({ tenantId, businessName, slug }: Props) {
    return (
        <>
            <Header
                businessName={businessName}
                slug={slug}
            />
            <StoreLanding
                tenantId={tenantId}
            />
            <Footer
            />
        </>
    )
}