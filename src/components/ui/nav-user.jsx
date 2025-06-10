import { IconCreditCard, IconLogout, IconNotification, IconUserCircle } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { clearUser } from "@/store/slices/user";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/routes/path";

export function NavUser({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Hàm lấy 2 chữ cái đầu từ hoTen
  const getInitials = (name) => {
    if (!name) return "CN"; // Giá trị mặc định nếu name rỗng hoặc null
    const words = name.trim().split(" ");
    if (words.length === 1) {
      // Nếu chỉ có 1 từ, lấy 2 chữ cái đầu
      return words[0].slice(0, 2).toUpperCase();
    }
    // Lấy chữ cái đầu của từ đầu tiên và từ cuối cùng
    const firstInitial = words[0][0] || "";
    const lastInitial = words[words.length - 1][0] || "";
    return (firstInitial + lastInitial).toUpperCase();
  };

  const handleLogout = () => {
    // Xóa user khỏi localStorage
    localStorage.removeItem("user");
    // Xóa user khỏi Redux store
    dispatch(clearUser());
    // Chuyển hướng về trang chủ
    navigate(PATH.HOME);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer">
        <Avatar className="h-8 w-8 rounded-lg grayscale">
          <AvatarImage src={user.avatar} alt={user.hoTen} />
          <AvatarFallback className="rounded-lg">{getInitials(user?.hoTen)}</AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">{user?.hoTen}</span>
          <span className="text-muted-foreground truncate text-xs">{user?.email}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={user.avatar} alt={user.hoTen} />
              <AvatarFallback className="rounded-lg">{getInitials(user?.hoTen)}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user?.hoTen}</span>
              <span className="text-muted-foreground truncate text-xs">{user?.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <IconUserCircle className="mr-2" />
            Tài khoản
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <IconCreditCard className="mr-2" />
            Hóa đơn
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <IconNotification className="mr-2" />
            Thông báo
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          <IconLogout className="mr-2" />
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
