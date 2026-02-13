
import { useEffect, useRef, useState } from "react";
import type { Store } from "../../types/Store";
import { ChevronDown, ChevronUp } from "lucide-react";

type Props = {
    getStores: () => void;
    onSelected: (id: string | null) => void;
    store: Store[];
    loading: boolean;
    error: boolean;
};

export function DropdownFilter({  onSelected, store, loading, error} : Props){

  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedLabel, setSelectedLabel] = useState("Todas as lojas");


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-[280px]">
      
      <div
        className="flex justify-between px-4 py-1 bg-[#fff] cursor-pointer"
        onClick={(e) => {
        e.stopPropagation();
        setOpen((prev) => !prev);
        }}>
            <p
            title={selectedLabel}
            className="px-2 truncate text-sm">{selectedLabel}
            </p>
            {open ? <ChevronUp /> : <ChevronDown />}             
      </div>

      {open && (
        <ul className="flex flex-col absolute w-[280px] max-h-[350px] 
        overflow-auto space-y-2 px-4 py-1 pb-4 bg-white cursor-pointer text-sm
        text-gray-600 rounded-md">
          <li
            onClick={() => {
              onSelected(null);
              setSelectedLabel("Todas as lojas")              ;
              setOpen(false);
            }}
          className="hover:bg-blue-100 hover:text-blue-600 py-2 px-2">
            Todas as lojas
          </li>

          {store.map((store) => (
            <li
              key={store.id}
              onClick={() => {
                onSelected(store.id);
                setSelectedLabel(store.name);
                setOpen(false);
              }}
              className={`flex py-2 px-2 items-center gap-4
              bg-[#fff] ${selectedLabel == store.name ? "bg-blue-100 text-blue-600" : ""}
              truncate hover:bg-blue-100 hover:text-blue-600`}
              title={store.name}
            >
              <p>{store.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};