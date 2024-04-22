"use client"
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import { Search, UserCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { mails } from "@/data/emali";
import { Separator } from "../ui/separator";
// import NavMenu from "../dashboard/NavMenu";
import { Input } from "../ui/input";
import AddUsers from "./AddUser";
import ChatSetting from "./ChatSetting";
import LoginUserProfile from "./LoginUserProfile";
import axios from "axios";
import { useEffect, useState } from "react";

interface UserData {
  id: string;
  participants:[],
  username: string;
  fullname: string;
  participantsId:string;
  email: string;
}
export default function SideBar() {
  const [data, setData] = useState<UserData[]>([]);
  useEffect(() => {
    axios.get("/api/chat/get-chat-room-user"
    ).then((response) => {
      console.log("Response:", response);
      if (response.statusText === "OK") {
        // console.log("data is :-", response.data.user);
        const users = response.data.user.map(
          (user: { _id: any; participants:any; participantsId:any; email: any;fullname:any}) => ({
            id: user._id,
            fullname:user.participants[0].fullname,
            participantsId:user.participants[0]._id
          })
        );

        setData(users);
      }
    });
  },[])
  
// console.log(data)



  return (
    <>
      <aside className=" fixed inset-y-0 left-0 z-10  w-72 shadow-2xl flex-col border-r bg-background sm:flex ">
        <div className="flex flex-col items-center gap-4 px-2 sm:py-4">
          <div className="flex flex-row items-center gap-16 ">
            <div className="">
              <LoginUserProfile/>
            </div>
            <div className="grid grid-cols-3 gap-10">
              <Link
                href="#"
                className="group flex h-9 w-9 shrink-0 items-center  gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
              >
                <AddUsers/>
    
                
                <span className="sr-only">Menu</span>
              </Link>
              <Link
                href="#"
                className="group flex h-9 w-9 shrink-0 items-center  gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
              >
                <ChatSetting/>
              
                <span className="sr-only">Menu</span>
              </Link>
            </div>
          </div>
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search
              size={20}
              className="absolute  right-5 top-3  text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 w-64"
              />
            </div>
          </form>
          {data?(
            <ScrollArea className="w-72 h-[70%]">
            <div className="flex flex-col gap-2 p-4 pt-0">
              {data.map((item) => (
                <div key={item.id}>
                  <Link href={`/inbox/${item.id}`} key={item.id}>
                    <div className="flex w-full flex-col gap-1">
                      <div className="flex items-center">
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarImage alt={item.fullname} />
                            <AvatarFallback>
                              {item.fullname
                                .split(" ")
                                .map((chunk) => chunk[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="font-semibold">{item.fullname}</div>
                          {/* {!item.read && (
                            <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                          )} */}
                        </div>
                      </div>
                    </div>
                    {/* <div className="line-clamp-2 text-xs text-muted-foreground">
                      {item.text.substring(0, 30)}....
                    </div> */}
                  </Link>
                  <Separator className="my-1" />
                </div>
              ))}
            </div>
          </ScrollArea>
          ):("user not found")}
          
        </div>
      </aside>
    </>
  );
}
