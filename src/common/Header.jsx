import { removeUserToken } from "@/app/redux/reducers/userSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
    const user = useSelector((state) => state.user.token);
    const dispatch = useDispatch();
    const router = useRouter();
    return (
        <div className='mx-auto max-w-[1515px] sticky top-0 bg-white'>
        <div className="shadow-lg h-[80px] w-full flex justify-between items-center px-4 text-[20px]">
            <Link href={'/'}>
                <Image src="/images/hyscaler-hz-0.png" alt="HyScaler Logo" width={200} height={100} />
            </Link>
            <ul className="flex gap-[20px]">
                {/* <li><Link href={'/'}>Home</Link></li>
                <li><Link href={'/about-us'}>About</Link></li>
                <li><Link href={'/contact-us'}>Contact</Link></li> */}
                <li>
                    {
                        user ?
                            <button onClick={() => {
                                console.log("logout btn clicked");
                                dispatch(removeUserToken(),
                                    localStorage.removeItem('jwt-token'),
                                    router.replace('/')
                                )
                            }} className=' text-red-500  py-[5px]'>Logout</button>
                            :
                            <Link href="/auth/login">
                                <button className=' text-blue-500  py-[5px]'>Login</button>
                            </Link>
                    }
                </li>
            </ul>
        </div>
        </div>
    );
}