import { Button } from 'shared/components/ui/button';
import { 
  DrawerRoot,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerBody,
  DrawerCloseTrigger,
} from 'shared/components/ui/drawer';
import { hideDrawer } from 'shared/modules/drawer/drawerSlice';
import { useAppDispatch } from 'shared/store/hooks';

export type Props = {
  title: string;
  description: string;
  onConfirm: () => void;
}

const ConfirmDrawer = (props: Props) => {
  const { title, description, onConfirm } = props;
  const dispatch = useAppDispatch();
  
  return (
    <DrawerRoot
      defaultOpen
      onOpenChange={() => dispatch(hideDrawer())}
    >
      <DrawerBackdrop />
      <DrawerContent>
        <DrawerCloseTrigger />
        <DrawerHeader>{title}</DrawerHeader>
        <DrawerBody>
          {description}
        </DrawerBody>

        <DrawerFooter>
          <Button
            variant="ghost"
            mr={3}
            onClick={() => dispatch(hideDrawer())}
          >
            Close
          </Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default ConfirmDrawer;