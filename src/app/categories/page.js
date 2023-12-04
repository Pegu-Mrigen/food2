"use client";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CategoriesPage = () => {
  const session = useSession();
  // const [isAdmin, setIsAdmin] = useState(false);
  // const [adminInfoLoading, setAdminInfoLoading] = useState(true);

  // useEffect(() => {

  //       fetch("/api/profile").then(response=>{

  //         response.json().then(data=>

  //           {

  //             setIsAdmin(data?.admin)
  //             setAdminInfoLoading(false)

  //           })

  //         })
  //   }, []);

  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [updateCategory, setUpdateCategory] = useState(null);

  const { loading: profileLoading, userData: profileData } = useProfile();

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

  // if(!session && !isAdmin){
  //   return "Not Admin"
  // }
  // if(adminInfoLoading ){
  //   return "loading info..."
  // }
  if (profileLoading) {
    return "loading info...";
  }
  if (!profileData.admin) {
    return "Not Admin";
  }

  const handleCategorySubmit = async (e) => {
    e.preventDefault();

    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };

      if (updateCategory) {
        data._id = updateCategory._id;
      }

      const response = await fetch("/api/categories", {
        method: updateCategory ? "PUT" : "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });
      setCategoryName("");

      fetchCategories();
      setUpdateCategory(null)

      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(creationPromise, {
      loading: updateCategory
        ? "Updating category..."
        : "Creating new category...",
      success: updateCategory ? "Category updated." : "Category created.",
      error: "Error...",
    });
  };

  return (
    <section className=" mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex  gap-2 items-end">
          <div className="grow">
            <label>
              {setUpdateCategory ? "Update category" : " New category name "}

              {updateCategory && (
                <>
                  :<b> {updateCategory.name}</b>
                </>
              )}
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div className="pb-2">
            <button className="border border-primary" type="submit">
              {setUpdateCategory ? "Update" : " Create "}
            </button>
          </div>
        </div>
      </form>

      <div>
        <h2 className="mt-8 text-sm text-gray-500">Edit category:</h2>
        {categories.length > 0 &&
          categories.map((c) => (
            <button
              onClick={() => {
                setUpdateCategory(c);
                setCategoryName(c.name);
              }}
              key={c._id}
              className="rounded-xl p-2 px-4 flex gap-1 cursor-pointer mb-2"
            >
              <span>{c.name}</span>
            </button>
          ))}
      </div>
    </section>
  );
};

export default CategoriesPage;
