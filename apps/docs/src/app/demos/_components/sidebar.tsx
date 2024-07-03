import Image from "next/image";
import Link from "next/link";

interface DataType {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    slug: string;
}
type Props = {
    data: DataType[]
}

const DemoSidebar = ({ data }: Props) => {
    return (
        <div className="rounded-xl shadow-lg border p-4">
            <div className="text-xl font-bold border-b mb-6 pb-4">More Demo</div>
            <div className="flex flex-col gap-4 overflow-auto max-h-[550px]">
                {
                    data.map((demo) => (
                        <Link
                            className="group shadow-lg border flex cursor-pointer items-center flex-col justify-center rounded-sm p-2"
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
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default DemoSidebar;