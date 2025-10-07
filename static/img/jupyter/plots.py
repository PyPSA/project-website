#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Oct 17 12:08:47 2021

@author: fabian
"""

import pypsa
import matplotlib.pyplot as plt
import powerplantmatching as pm
import cartopy.crs as ccrs
import numpy as np
import pandas as pd
import networkx as nx
import atlite
import geopandas as gpd
import matplotlib as mpl

#%% pypsa plot
n = pypsa.examples.scigrid_de()

fig, ax = plt.subplots(figsize=(5,5))
n.plot(geomap=False, layouter=nx.drawing.layout.kamada_kawai_layout,
       bus_sizes=0.0001, line_widths=0.5, link_widths=0.5,
       transformer_widths=0.5,
       ax=ax)
fig.savefig('pypsa.png', bbox_inches='tight', transparent=True)


# %% atlite
cutout = atlite.Cutout('global', x=slice(-180, 180), y=slice(-180, 180),
                       time='2018-05-05', module='era5')
cutout.prepare('wind')

projection = ccrs.Orthographic(0, 30)
fig, ax = plt.subplots(figsize=(5,5), subplot_kw={"projection": projection})
cutout.data.wnd100m.isel(time=5).plot(ax=ax,
                                      transform=ccrs.PlateCarree(),
                                      add_colorbar=False,
                                      norm=mpl.colors.Normalize(vmin=0, vmax=20),
                                      alpha=.3,
                                      cmap='Blues',
                                      zorder=5)
ax.coastlines(zorder=6, linewidth=0.5)
ax.set_title('')
ax.spines['geo'].set_visible(False)
fig.savefig('atlite.png', bbox_inches='tight')



#%% powerplantmatching plot

df = pm.powerplants()

df = df.powerplant.set_uncommon_fueltypes_to_other()
shown_fueltypes = df.Fueltype.unique()
df = df[df.lat.notnull()]
df = df.query('-10 <= lon <= 30').query('36 <= lat <= 70')

fig, ax = plt.subplots(figsize=(5,5), subplot_kw={"projection": ccrs.EqualEarth()})

scale=1e-2
ax.scatter(
    df.lon,
    df.lat,
    s=df.Capacity * scale,
    c=df.Fueltype.map(pm.get_config()["fuel_to_color"]),
    edgecolor="face",
    facecolor="face",
    alpha=1,
    zorder=3,
    transform=ccrs.PlateCarree(),
)
ax.autoscale_view()
ax.coastlines(linewidth=0.3, zorder=1)
ax.spines['geo'].set_visible(False)


fig.savefig('powerplantmatching.png', bbox_inches='tight', dpi=100)


#%% linopy plot

N = 10

fig, ax = plt.subplots(figsize=(5,5))
ax.axis('off')
ax.set_aspect('equal', adjustable='box')
ax.set_xlim(0,N-1)

c = np.array([2,3])
x = np.array([2.5, 3])
carray = pd.DataFrame([[c @ np.array([x1,x2]) for x1 in range(N)]
                       for x2 in range(N)])
ax.contourf(carray, levels=1000)
ax.fill_between(np.linspace(-1, 7, N), np.linspace(6, 0, N), alpha=0.3, color='orange')
ax.fill_between(np.linspace(1, 9, N), np.linspace(0, 4, N), alpha=0.2, color='red')


ax.scatter(4.6, 1.9, marker='8', color='white', zorder=8)
fig.tight_layout(pad=0)
fig.savefig('linopy.png', bbox_inches='tight')