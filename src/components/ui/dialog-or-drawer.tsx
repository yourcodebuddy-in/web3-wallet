/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useWindowSize } from "@uidotdev/usehooks";
import { X } from "lucide-react";

function DialogOrDrawer({ children, ...props }: any) {
  const { width } = useWindowSize();
  if (!width) return null;
  const isMobile = width < 768;
  const Root = isMobile ? Drawer : Dialog;
  return <Root {...props}>{children}</Root>;
}

function DialogOrDrawerTitle({ children, ...props }: any) {
  const { width } = useWindowSize();
  if (!width) return null;
  const isMobile = width < 768;
  const Title = isMobile ? DrawerTitle : DialogTitle;
  return <Title {...props}>{children}</Title>;
}

function DialogOrDrawerDescription({ children, ...props }: any) {
  const { width } = useWindowSize();
  if (!width) return null;
  const isMobile = width < 768;
  const Description = isMobile ? DrawerDescription : DialogDescription;
  return <Description {...props}>{children}</Description>;
}
function DialogOrDrawerHeader({ children, ...props }: any) {
  const { width } = useWindowSize();
  if (!width) return null;
  const isMobile = width < 768;
  const Header = isMobile ? DrawerHeader : DialogHeader;
  return <Header {...props}>{children}</Header>;
}
function DialogOrDrawerFooter({ children, ...props }: any) {
  const { width } = useWindowSize();
  if (!width) return null;
  const isMobile = width < 768;
  const Footer = isMobile ? DrawerFooter : DialogFooter;
  return <Footer {...props}>{children}</Footer>;
}

function DialogOrDrawerClose({ children, ...props }: any) {
  const { width } = useWindowSize();
  if (!width) return null;
  const isMobile = width < 768;
  const Close = isMobile ? DrawerClose : DialogClose;
  return <Close {...props}>{children}</Close>;
}

function DialogOrDrawerContent({ children, ...props }: any) {
  const { width } = useWindowSize();
  if (!width) return null;
  const isMobile = width < 768;
  const Content = isMobile ? DrawerContent : DialogContent;

  return (
    <Content {...props}>
      {children}
      {!!isMobile && (
        <DialogOrDrawerTrigger>
          <X size={27} className="absolute right-3 top-3 rounded-full border bg-white p-1" />
        </DialogOrDrawerTrigger>
      )}
    </Content>
  );
}

function DialogOrDrawerTrigger({ children, ...props }: any) {
  const { width } = useWindowSize();
  if (!width) return null;
  const isMobile = width < 768;
  const Trigger = isMobile ? DrawerTrigger : DialogTrigger;

  return <Trigger {...props}>{children}</Trigger>;
}

export {
  DialogOrDrawer,
  DialogOrDrawerClose,
  DialogOrDrawerContent,
  DialogOrDrawerDescription,
  DialogOrDrawerFooter,
  DialogOrDrawerHeader,
  DialogOrDrawerTitle,
  DialogOrDrawerTrigger,
};
