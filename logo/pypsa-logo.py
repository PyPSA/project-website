#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Oct 18 18:15:09 2021

@author: fabian
"""

import pypsa
import pandas as pd
import cartopy.crs as ccrs
import matplotlib.pyplot as plt


x = [0, .5, 1]
y = [0, 0.85, 0]
colors = ['#14a951', '#d9a717', '#258fb0']
textparams = dict(font="Ubuntu", color='#6f6070')


#%% vertical

def add_triangle(ax):
    for i in range(3):
        ax.plot([x[i], x[(i+1)%3]], [y[i], y[(i+1)%3]], c='#c81952', zorder=1,
                lw=30, alpha=0.8)
    ax.scatter(x, y, c=colors, zorder=3, s=10000, edgecolor='white', linewidths=5)
    ax.axis('off')
    ax.set_xlim(-.2, 1.2)
    ax.set_ylim(-.2, 1.)

fig, ax = plt.subplots(figsize=(10,10))
add_triangle(ax)
ax.text(-0.15, -0.6, 'PyPSA',  **textparams, size=200,)
plt.savefig(f'logo-v.pdf', bbox_inches='tight', transparent=True)
plt.savefig(f'logo-v.png', bbox_inches='tight', transparent=True, dpi=100)
plt.show()

#%% horizontal
fig,ax = plt.subplots(1,1, subplot_kw={"projection":ccrs.PlateCarree()}, figsize=(10,10))
add_triangle(ax)
ax.text(1.2, 0, 'PyPSA', **textparams, fontsize=450,)

plt.savefig(f'logo-h.pdf', bbox_inches='tight', transparent=True)
plt.savefig(f'logo-h.png', bbox_inches='tight', transparent=True, dpi=100)
plt.show()

#%% trianlge only
fig,ax = plt.subplots(1,1, subplot_kw={"projection":ccrs.PlateCarree()}, figsize=(10,10))
add_triangle(ax)

plt.savefig(f'logo-only.pdf', bbox_inches='tight', transparent=True)
plt.savefig(f'logo-only.png', bbox_inches='tight', transparent=True, dpi=100)
plt.show()


#%% trianlge only github
fig,ax = plt.subplots(1,1, subplot_kw={"projection":ccrs.PlateCarree()}, figsize=(10,10))
add_triangle(ax)

plt.savefig(f'logo-only-GH.png', transparent=True, dpi=100)
plt.show()