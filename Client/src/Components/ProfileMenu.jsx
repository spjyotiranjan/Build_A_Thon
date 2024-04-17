import React from "react";
import {
  Button,
  Fade,
  Center,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { MdManageAccounts } from "react-icons/md";
import { useNavigate } from "react-router";

import { CgProfile } from "react-icons/cg";
import { useAuth0 } from "@auth0/auth0-react";
import { TbLogout2 } from "react-icons/tb";
import "./../Font.css"

const ProfileMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logout, isLoading } = useAuth0();
  const navigate = useNavigate(null);
  return (
    <Menu isOpen={isOpen}>
      <MenuButton
        variant={"ghost"}
        // w={"3vw"}
        // bgColor={"green"}
        px={"0"}
        h={[null, "5vw", null, "4.4vw"]}
        color={"white"}
        _expanded={{ color: "#ffffffe6", backgroundColor: "transparent" }}
        as={Button}
        _focus={{ boxShadow: "none" }}
        onClick={isOpen ? onClose : onOpen}
        filter={`${
          isOpen
            ? "drop-shadow(0 0 0.2vw #ffffff90)"
            : "drop-shadow(0 0 0vw #ffffff00)"
        }`}
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        transition={"all 0.4s"}
      >
        <Icon
            as={CgProfile}
            ml={"auto"}
            boxSize={7}
            color={"white"}
            // transform={`${isOpen ? "translateX(0vw)" : "translateX(12vw)"}`}
            transition={"all 0.4s"}
          />
      </MenuButton>
      <MenuList
        my={[null, "-1vw", null, "-0.51vw"]}
        mx={"-0.51vw"}
        bgColor={"#ffffff33"}
        border={"1px solid #ffffff1a"}
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        // bgColor={"#ffffff22"}
        backdropBlur={"15px"}
        backdropFilter={"auto"}
        // border={"none"}
        p={"0.5vw"}
      >
        <MenuItem
          bgColor={"#10223000"}
          borderRadius={"0.3vw"}
          _hover={{
            backgroundColor: "#ffffff10",
            transition: "all 0.5s",
          }}
          fontSize={[null, "1.3vw", null, "1vw"]}
          color={"white"}
        //   fontWeight={"bold"}
          className="robotoMono"
          onClick={() => {
            navigate("/profile");
          }}
          fontWeight={"bold"}
        >
          <Icon as={MdManageAccounts} boxSize={6} mr={"1vw"} />
          {user.name}
        </MenuItem>
        <MenuItem
          bgColor={"#10223000"}
          borderRadius={"0.3vw"}
          _hover={{
            backgroundColor: "#ffffff10",
            transition: "all 0.5s",
          }}
          fontSize={[null, "1.3vw", null, "1vw"]}
          color={"#ff0000"}
        //   fontWeight={"semibold"}
          fontWeight={"bold"}
          className="robotoMono"
          onClick={() => {
            logout({ logoutParams: { returnTo: window.location.origin } });
            // deleteCookie("username");
            // setUserData({});
            // setLoggedInuser({});
            // setLoginDone(false);
            // setUserId("");
            // setAllUsers([]);
          }}
        >
          <Icon as={TbLogout2} boxSize={6} mr={"1vw"} />
          LogOut
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
