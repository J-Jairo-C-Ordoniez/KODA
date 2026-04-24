'use client';

import { useState, useEffect } from 'react';
import { FilterDropdown } from './FilterDropdown';
import useFilterCatalogStore from '../../../../store/filterCatalog.store';

export default function FilterBar({ tenantId }: { tenantId?: string }) {
  const { setColor, setCategory } = useFilterCatalogStore();
  const [colorOptions, setColorOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`/api/catalog?action=categories&tenantId=${tenantId}`);
        const data = await res.json();
        setCategoryOptions(data.map((cat: any) => ({ ...cat, checked: false })));

      } catch (err) {
        setCategoryOptions([]);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const res = await fetch(`/api/catalog?action=colors&tenantId=${tenantId}`);
        const data = await res.json();
        setColorOptions(data.map((color: any) => ({ ...color, checked: false })));
      } catch (err) {
        setColorOptions([]);
      }
    };

    fetchColors();
  }, []);

  useEffect(() => {
    setColor(colorOptions.filter(opt => opt.checked), tenantId);
  }, [colorOptions]);

  useEffect(() => {
    setCategory(categoryOptions.filter(opt => opt.checked), tenantId);
  }, [categoryOptions]);

  return (
    <section className="w-full py-2">
      <div className="flex items-center justify-between">
        <FilterDropdown
          title="COLOR"
          options={colorOptions}
          setOptions={setColorOptions}
          align="left"
        />

        <FilterDropdown
          title="CLASIFICAR POR"
          options={categoryOptions}
          setOptions={setCategoryOptions}
          align="right"
        />
      </div>
    </section>
  );
}
