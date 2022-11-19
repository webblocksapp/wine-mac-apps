import { Component, For, Match, Show, Switch } from 'solid-js';
import { MenuItem } from '@interfaces';
import { NavLink } from '@solidjs/router';
import { Accordion, List, ListItem, Wrap } from '@components';
import './index.css';

export interface TreeMenuProps {
  menu?: MenuItem[];
}

export const TreeMenu: Component<TreeMenuProps> = (props) => {
  return (
    <List classList={{ 'tree-menu': true }}>
      <For each={props.menu}>
        {(item) => (
          <ListItem>
            <Switch fallback={item.text}>
              <Match when={item.children}>
                <Accordion text={item.text}>
                  <TreeMenu menu={item.children} />
                </Accordion>
              </Match>
            </Switch>
          </ListItem>
        )}
      </For>
    </List>
    // <List>
    //   <For each={props.menu}>
    //     {(item) => (
    //       <ListItem>
    //         <Wrap
    //           when={Boolean(item.route)}
    //           with={(children) => (
    //             <NavLink
    //               href={item.route || ''}
    //               target={item.external ? 'blank' : undefined}
    //             >
    //               {children}
    //             </NavLink>
    //           )}
    //         >
    //           {item.text}
    //         </Wrap>
    //         <Show when={item.children}>
    //           <TreeMenu menu={item.children} />
    //         </Show>
    //       </ListItem>
    //     )}
    //   </For>
    // </List>
  );
};
