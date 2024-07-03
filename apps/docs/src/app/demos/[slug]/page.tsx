import { Container } from "@/components/Container";
import DemoSidebar from "../_components/sidebar";
import { Demo_Stv } from "../data";
import Player from "./player";

export default function DemoSubPage({ params }: { params: { slug: string } }) {
    console.log("🚀 ~ DemoSubPage ~ slug:", params)
    return (
        <Container>
            <div className="flex gap-10">
                <div className="basis-2/3">
                    <Player slug={params.slug} />
                </div>
                <div className="basis-1/3">
                    <DemoSidebar data={Demo_Stv} />
                </div>
            </div>
        </Container>
    );
}
