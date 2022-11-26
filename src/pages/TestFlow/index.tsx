import { Component } from 'solid-js';
import { Box, Button, Grid, TextInput } from '@components';
import { useWineApp } from '@utils';

export const TestFlow: Component = () => {
  const wine = useWineApp({
    name: 'steam',
    engine: { version: 'WS11WineCX64Bit22.0.1', url: '' },
  });

  return (
    <div style="padding: 20px;">
      <ol>
        <li>
          <Button
            onClick={() => wine.createWineApp({ setupExecutablePath: '' })}
          >
            Engine
          </Button>
        </li>
        {/* <li>
          <Button
            onClick={() =>
              wine.winetricks(['steam', 'dxvk_macos.verb'], {
                silent: false,
                onlyEcho: true,
              })
            }
          >
            winetricks steam
          </Button>
        </li> */}
        <li>
          <Button onClick={wine.winecfg}>winecfg</Button>
        </li>
        <li>
          <Button
            onClick={() =>
              wine.runProgram('drive_c/Program Files (x86)/Steam/steam.exe', [
                '-noreactlogin',
                '-allosarches',
                '-cef-force-32bit',
                '-udpforce',
              ])
            }
          >
            Run steam
          </Button>
        </li>
        <li>
          Pipeline
          <pre>
            <code>{JSON.stringify(wine.pipeline, null, 2)}</code>
          </pre>
        </li>
        <li>
          Output
          <pre>
            <code>{wine.consoleOutput()}</code>
          </pre>
        </li>
      </ol>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box style={{ 'background-color': 'red' }}>A-1</Box>
            </Grid>
            <Grid item xs={6}>
              <Box>A-2</Box>
            </Grid>
            <Grid item xs={6}>
              <Box>A-3</Box>
            </Grid>
            <Grid item xs={6}>
              <Box>A-4</Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>B</Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>C</Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>D</Box>
        </Grid>
      </Grid>
      <TextInput label="Example" name="example" />
      <TextInput label="Name" name="name" error errorMessage="Name exists" />
    </div>
  );
};
