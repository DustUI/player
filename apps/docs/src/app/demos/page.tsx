import { Container } from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import { Demo_data } from "./data";

export default function DemoPage() {
    return (
        <Container>
            <div>

                <div className="flex flex-col gap-6">
                    {
                        Demo_data.map((data) => (
                            <div className="">
                                <h2 className="text-2xl font-bold">{data.title}</h2>
                                <div className="grid grid-cols-4 gap-4">
                                    {
                                        data.data.map((demo) => (
                                            <Link
                                                className="group flex cursor-pointer flex-col items-center justify-center rounded-sm p-2"
                                                href={`/demos/${demo.slug}`}
                                                key={demo.id}
                                            >
                                                <div className="flex w-full flex-col border border-border/80 text-soft/80 hover:text-inverse shadow-sm group-hover:border-2 group-hover:border-blue-300 group-hover:bg-elevate h-[180px] overflow-hidden rounded-md " aria-hidden="true">
                                                    <div className="relative flex h-full w-full items-center justify-center" >
                                                        <Image src={demo.image} alt={demo.title} fill />
                                                    </div>
                                                </div>
                                                <div className="mt-4 flex w-full flex-col justify-start text-base font-semibold">
                                                    <span className="text-xs text-soft/90">{demo.subtitle}</span>
                                                    <span className="mt-1 text-inverse">{demo.title}</span>
                                                </div>
                                                <p className="mt-2 w-full text-xs text-soft/90">{demo.description}</p>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>
        </Container>
    );
}
