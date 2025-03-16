import Link from 'next/link'
const footer=()=>{
  return(
<footer class="bg-white rounded-lg shadow-sm dark:bg-gray-900 mx-0 mt-4">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
        <div className="Logo flex  xs:mx-2 justify-center items-center gap-5">
                        <Link href="/" className="logo text-[#ea002a] font-bold text-2xl xs:text-3xl">
                            LAHORI
                        </Link>


                    </div>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <Link href="/about" class="hover:underline me-4 md:me-6">About</Link>
                </li>
                <li>
                    <Link href="/privacy-policy" class="hover:underline me-4 md:me-6">Privacy Policy</Link>
                </li>
                <li>
                    <Link href="/admin/dashboard" class="hover:underline me-4 md:me-6">Admin</Link>
                </li>
                <li>
                    <Link href="/contact" class="hover:underline">Contact</Link>
                </li>
            </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <Link href="/" class="hover:underline">Lahori™</Link>. All Rights Reserved.</span>
    </div>
</footer>

  )
}

export default footer
