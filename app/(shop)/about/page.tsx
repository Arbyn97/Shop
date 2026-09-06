function About() {
    return ( <main
      dir="rtl"
      className="min-h-screen bg-gray-100 px-5 py-12"
    >
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-md">

        <h1 className="mb-4 text-center text-4xl font-bold text-gray-900">
          درباره پروژه
        </h1>

        <div className="mx-auto mb-10 h-1 w-16 rounded-full bg-pink-400" />

        {/* Technologies */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          <span className="rounded-lg bg-gray-900 px-4 py-2 font-medium text-white">
            React
          </span>

          <span className="rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-800">
            Next.js
          </span>

          <span className="rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-800">
            Tailwind CSS
          </span>
        </div>

        {/* Description */}
        <p className="mb-10 text-lg leading-9 text-gray-600">
          این پروژه یک سایت فروشگاهی است که با استفاده از
          <span className="mx-1 font-semibold text-gray-900">
            React
          </span>
          و
          <span className="mx-1 font-semibold text-gray-900">
            Next.js
          </span>
          و
          <span className="mx-1 font-semibold text-gray-900">
            Tailwind CSS
          </span>
          توسعه داده شده است.
        </p>

        {/* Features */}
        <section className="mb-8">
          <h2 className="mb-5 border-r-4 border-pink-400 pr-3 text-2xl font-bold text-gray-900">
            امکانات فروشگاه
          </h2>

          <ul className="grid gap-3 text-lg text-gray-600 sm:grid-cols-2">
            <li className="rounded-xl bg-gray-50 p-4">
               انتخاب و مشاهده کالاها
            </li>

            <li className="rounded-xl bg-gray-50 p-4">
               مشاهده جزئیات کالا
            </li>

            <li className="rounded-xl bg-gray-50 p-4">
               افزودن کالا به سبد خرید
            </li>

            <li className="rounded-xl bg-gray-50 p-4">
               حذف کالا از سبد خرید
            </li>

            <li className="rounded-xl bg-gray-50 p-4">
               افزایش و کاهش تعداد کالاها
            </li>

            <li className="rounded-xl bg-gray-50 p-4">
               مشاهده و پرداخت سفارش‌ها
            </li>
          </ul>
        </section>

        {/* Authentication */}
        <section className="mb-8 rounded-2xl bg-gray-50 p-6">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            احراز هویت کاربران
          </h2>

          <p className="text-lg leading-9 text-gray-600">
            برای ورود و ثبت‌نام کاربران، صفحات
            <span className="mx-1 font-semibold text-gray-900">
              Login
            </span>
            و
            <span className="mx-1 font-semibold text-gray-900">
              Sign in
            </span>
            طراحی شده‌اند. در فرم‌های ورود و ثبت‌نام، فرمت ایمیل،
            قدرت رمز عبور و صحت اطلاعات واردشده بررسی می‌شود.
          </p>
        </section>

        {/* Admin */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            پنل مدیریت
          </h2>

          <p className="text-lg leading-9 text-gray-600">
            برای مدیریت سیستم، یک پنل
            <span className="mx-1 font-semibold text-gray-900">
              Admin
            </span>
            در نظر گرفته شده است. مدیر می‌تواند کالاها را حذف یا
            ویرایش کند و لیست کاربران، سفارش‌ها و وضعیت سفارش‌ها را
            مشاهده و مدیریت کند.
          </p>
        </section>
            <section className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <p className="text-lg leading-9 text-gray-600">
  در توسعه این پروژه از هوش مصنوعی به عنوان دستیار برنامه‌نویسی
  برای یادگیری مفاهیم، بررسی و بهبود کد، رفع خطاها و حل مسائل
  فنی استفاده شده است.
</p>
            </section>
      </div>
    </main> );
}

export default About;